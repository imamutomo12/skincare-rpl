import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { SkinContext } from "../context/SkinProvider";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const ProfileAdmin = () => {
  const { user, fullName, role, setUser, setFullName } =
    useContext(UserContext);
  const { skinData } = useContext(SkinContext);

  // Editable fields
  const [editFullName, setEditFullName] = useState(fullName || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");
  const [editUsername, setEditUsername] = useState(""); // Assuming you want to store usernames
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fullName) setEditFullName(fullName);
    if (user?.email) setEditEmail(user.email);
  }, [fullName, user]);

  // Update user information in Firestore
  const handleSave = async () => {
    if (!user || !user.uid) return;
    setLoading(true);

    try {
      const userDocRef = doc(db, "Users", user.uid);
      await updateDoc(userDocRef, {
        fullName: editFullName,
        username: editUsername,
        email: editEmail,
      });

      setFullName(editFullName);
      setUser((prev) => ({ ...prev, email: editEmail }));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-tiga flex items-center justify-center">
      <div className="bg-empat rounded-3xl shadow-xl py-10 px-8 sm:px-16 w-full max-w-md font-jura text-hitam">
        <h2 className="text-center text-4xl font-bold mb-8">Profile</h2>

        {/* User Information Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-xl mb-2">Full Name</label>
            <input
              type="text"
              value={editFullName}
              onChange={(e) => setEditFullName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-telorasin bg-tiga focus:border-hitam focus:ring focus:ring-hitam transition-all"
            />
          </div>

          <div>
            <label className="block text-xl mb-2">Username</label>
            <input
              type="text"
              value={editUsername}
              onChange={(e) => setEditUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-telorasin bg-tiga focus:border-hitam focus:ring focus:ring-hitam transition-all"
            />
          </div>

          <div>
            <label className="block text-xl mb-2">Email</label>
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-telorasin bg-tiga focus:border-hitam focus:ring focus:ring-hitam transition-all"
            />
          </div>

          <div>
            <label className="block text-xl mb-2">Role</label>
            <input
              type="text"
              value={role}
              disabled
              className="w-full px-4 py-2 rounded-lg border bg-gray-300 cursor-not-allowed"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-dongker text-white py-2 rounded-lg hover:bg-hitam transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Skin Analysis Results */}
        <div className="mt-8 p-5 bg-taro rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2 text-hitam">Skin Analysis</h2>
          {skinData ? (
            <>
              <p>
                <strong>Skin Type:</strong> {skinData.skin ?? "Not Analyzed"}
              </p>
              <p>
                <strong>Acne Level:</strong> {skinData.acne ?? "Unknown"}
              </p>
              <p>
                <strong>Blackheads:</strong> {skinData.blackhead ?? "Unknown"}
              </p>
              <p className="text-sm text-gray-500">
                Last updated:{" "}
                {skinData.updatedAt?.toDate().toLocaleString() ?? "N/A"}
              </p>
            </>
          ) : (
            <p className="text-gray-500">No skin analysis data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmin;
