import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { SidebarUser } from "./SidebarUser";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

function Analyze() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);

  // Mapping skin index to its type (use lowercase for internal mapping)
  const skinTypes = ["oily skin", "dry skin", "normal skin", "mixed skin"];

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Handle file upload and analysis
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await fetch("/api/analyze-face", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log(data.skin);

      // Save analysis result to Firestore under "skin" collection using user's uid as document id
      if (user && user.uid && data) {
        await setDoc(doc(db, "skin", user.uid), {
          skin: data.skin, // expected data: { skin: 0 } etc.
          updatedAt: new Date(),
        });
      }

      setResult(data);
    } catch (error) {
      alert(`Error: ${error.message}
        data:${data.skin}`);
    } finally {
      setLoading(false);
    }
  };

  // Add cleanup for object URL
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Handle navigation to home with recommended skin type
  const handleRecommend = () => {
    // Map the skin index to a skin type string.
    const recommendedSkin = skinTypes[result.skin];
    // Pass the recommended skin type as a string via router state.
    navigate("/home", { state: { skin: recommendedSkin } });
  };

  return (
    <div className="flex h-screen">
      <SidebarUser
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex-grow w-min overflow-y-auto h-screen bg-krem p-5">
        <div className="mb-5 text-center">
          <h1 className="font-bold font-jura text-lg md:text-3xl">
            Analyze Your Face
          </h1>
        </div>

        {/* Photo Quality Guidelines Section */}
        <div className="bg-white rounded p-5 shadow-md mb-5 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-3">Photo Quality Guidelines</h2>
          <ul className="list-disc list-inside mb-3">
            <li>
              <strong>Format:</strong> JPG (JPEG)
            </li>
            <li>
              <strong>Size (Dimensions):</strong> Between 200×200 and 4096×4096
              pixels.
            </li>
            <li>
              <strong>File Size:</strong> No larger than 2MB.
            </li>
            <li>
              <strong>Minimal Size of Face:</strong>
              <ul className="list-disc list-inside ml-5">
                <li>
                  <em>Recommended:</em> Face frame (square) should be no less
                  than 200 pixels.
                </li>
                <li>
                  <em>Check Size:</em> Minimum is 160 pixels.
                </li>
                <li>
                  The square’s side length should be at least 1/10 of the
                  image’s short side.
                </li>
              </ul>
            </li>
            <li>
              <strong>Face Quality:</strong> The image should be well lit, in
              focus, and free of obstructions.
              <ul className="list-disc list-inside ml-5">
                <li>Avoid occlusions (e.g., hats, sunglasses, masks).</li>
                <li>
                  Avoid blur and improper lighting (glare, dark shadows,
                  backlight).
                </li>
                <li>
                  Face angle should be within ±45° for roll, yaw, and pitch.
                </li>
              </ul>
            </li>
          </ul>

          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1 border p-3 rounded">
              <h3 className="font-semibold mb-2 text-green-600">
                Right Photo Example
              </h3>
              {/* Replace with an actual image if available */}
              <div className="h-40 bg-green-100 flex items-center justify-center">
                <p className="text-sm text-green-800">
                  Clear, well-lit face, correct size, proper orientation.
                </p>
              </div>
            </div>
            <div className="flex-1 border p-3 rounded">
              <h3 className="font-semibold mb-2 text-red-600">
                Wrong Photo Example
              </h3>
              {/* Replace with an actual image if available */}
              <div className="h-40 bg-red-100 flex items-center justify-center">
                <p className="text-sm text-red-800">
                  Blurry, poorly lit face, occlusions, or incorrect dimensions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* File Upload and Analysis Section */}
        <div className="flex flex-col items-center justify-center gap-4 p-5">
          <div className="relative w-64 h-64 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={loading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-500 text-center p-4">
                Click to upload a face photo
                <br />
                (JPEG, PNG)
              </span>
            )}
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="animate-spin h-5 w-5 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </div>
          )}

          <button
            onClick={handleRecommend}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Recommend Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default Analyze;
