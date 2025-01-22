import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { SidebarUser } from "./SidebarUser";
import { useState } from "react";
export function Home() {
  const { setUser, setRole, user, role, logout } = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <SidebarUser
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex items-center">
        <h1 className="font-bold">Selamat Datang Di Home </h1>
        <button
          onClick={() => logout()}
          className="rounded-lg mt-6 text-2xl font-bold text-white bg-slate-600"
        >
          Logout
        </button>
      </div>
    </>
  );
}
