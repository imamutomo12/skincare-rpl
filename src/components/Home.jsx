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
      <div className="flex h-screen">
        <SidebarUser
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="flex-grow h-screen bg-krem items-center">
          <h1 className="font-bold">Selamat Datang Di Home </h1>
        </div>
      </div>
    </>
  );
}
