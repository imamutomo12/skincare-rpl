import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { SidebarUser } from "./SidebarUser";
import { useState, useEffect } from "react";
import { ManageAccountsRounded } from "@mui/icons-material";
import { SkinContext } from "../context/SkinProvider";

export function ProfileUser() {
  const { fullName, email, role, updateUser } = useContext(UserContext);
  const { skinData, loading } = useContext(SkinContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ fullName, email });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [skinn, setSkinn] = useState(skinData || "");
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData); // Update user context
    setIsEditing(false);
  };
  const skinTypes = ["Oily Skin", "Dry skin", "Normal skin", "Mixed skin"];
  useEffect(() => {
    if (location.state?.skin) {
      // If the recommended skin type was passed via navigation state
      setRecommendedSkin(location.state.skin);
    } else if (skinData?.skin !== undefined) {
      // If it's available in Firestore, use that
      setSkinn(skinTypes[skinData.skin]);
    }
  }, [location.state, skinData]);

  return (
    <>
      <div className="flex h-screen">
        <div className="flex-grow w-min overflow-y-auto justify-center h-screen bg-tiga">
          {/* Profile Section */}
          <div className="flex-grow p-8">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <ManageAccountsRounded />
              My Profile
            </h1>

            <div className="bg-white p-6 rounded-lg shadow-md mt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                {/* Role (Non-editable) */}
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Role
                  </label>
                  <input
                    type="text"
                    value={role}
                    disabled
                    className="w-full p-2 border bg-gray-100 rounded-md"
                  />
                </div>

                {/* Skin Type */}
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Skin Type
                  </label>
                  {/* Display loading message if skin data is loading */}
                  {loading ? (
                    <p>Loading skin data...</p> // You can replace this with a spinner
                  ) : skinData ? (
                    <input
                      type="text"
                      value={skinTypes[skinData.skin]}
                      disabled
                      className="w-full p-2 border bg-gray-100 rounded-md"
                    />
                  ) : (
                    <p>No skin data available</p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  {isEditing ? (
                    <>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-300 px-4 py-2 rounded-md"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
