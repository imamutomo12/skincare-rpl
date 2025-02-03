import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { SidebarUser } from "./SidebarUser";
import { useState, useEffect } from "react";
import { ManageAccountsRounded } from "@mui/icons-material";

export function ProfileUser() {
  const { fullName, email, role, skinType, updateUser } =
    useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ fullName, email, skinType });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData); // Update user context
    setIsEditing(false);
  };

  const skinTypes = ["Oily Skin", "Dry skin", "Normal skin", "Mixed skin"];

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex h-screen">
        <SidebarUser
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
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
                    disabled={!isEditing}
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
                  <select
                    name="skinType"
                    value={formData.skinType}
                    onChange={handleChange}
                    disabled={true}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Oily">Oily</option>
                    <option value="Dry">Dry</option>
                    <option value="Combination">Combination</option>
                    <option value="Sensitive">Sensitive</option>
                  </select>
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
