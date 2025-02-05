// DashboardLayout.jsx
import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { SidebarUser } from "./SidebarUser";
import { SidebarAdmin } from "./SidebarAdmin";
import LoadingPage from "./LoadingPage";

export function DashboardLayout() {
  const { role, loading } = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to control (toggle) the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  console.log("DashboardLayout Rendered - Role:", role, "Loading:", loading);
  const currentRole = role || "user";
  return (
    <div className="flex h-screen">
      {/* Check if this logs correctly */}
      {/* Sidebar always renders */}
      {currentRole === "admin" ? (
        <SidebarAdmin
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      ) : (
        <SidebarUser
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      )}

      {/* Main content area with margin-left depending on sidebar state */}
      <div
        className={`relative flex-grow transition-all duration-300 overflow-y-auto bg-tiga `}
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg font-bold">Loading...</p>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
