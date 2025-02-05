import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import {
  HomeRounded,
  ManageAccountsRounded,
  Person2Rounded,
  LogoutRounded,
  ArrowBackOutlined,
  ArrowForwardOutlined,
} from "@mui/icons-material";
import logo from "../assets/logo1.png";
export function SidebarAdmin({ toggleSidebar, isSidebarOpen }) {
  const { fullName, logout } = useContext(UserContext);

  return (
    <div
      className={`${
        isSidebarOpen ? "w-72" : "w-0"
      } bg-taro text-empat h-screen transition-all duration-300 flex flex-col`}
    >
      <nav className="flex-grow text-center font-jura font-bold text-2xl">
        <ul className="space-y-4 p-4">
          <li className="p-4 hover:bg-dongker/20 rounded-lg transition-colors">
            <img src={logo} className="size-40 mx-auto" alt="Logo" />
            <h2 className="text-sm text-center md:text-lg mt-2 flex items-center justify-center gap-2">
              <Person2Rounded />
              <span className="font-semibold">{fullName || "Loading..."}</span>
            </h2>
          </li>
        </ul>
        <ul className="space-y-2">
          <li className="hover:bg-dongker/20 p-3 rounded-lg transition-colors">
            <a
              href="/home"
              className="flex items-center gap-2 justify-start px-4"
            >
              <HomeRounded className="w-5 h-5" />
              <span className="text-lg font-semibold">Home</span>
            </a>
          </li>
          <li className="hover:bg-dongker/20 p-3 rounded-lg transition-colors">
            <a
              href="/profile"
              className="flex items-center gap-2 justify-start px-4"
            >
              <ManageAccountsRounded className="w-5 h-5" />
              <span className="text-lg font-semibold">My Account</span>
            </a>
          </li>
        </ul>
      </nav>
      <button
        onClick={() => logout()}
        className="p-4 bg-dongker hover:text-lg w-full text-left font-jura text-white font-bold transition duration-300"
      >
        <LogoutRounded />
        Logout
      </button>
      <button
        onClick={toggleSidebar}
        className={`absolute bottom-4 ${
          isSidebarOpen ? "left-36 md:left-72" : "left-1"
        } bg-taro text-empat hover:bg-dongker/20 font-bold p-3 mx-2 sm:z-20 rounded-md shadow-lg z-50 transition-all duration-300`}
      >
        {isSidebarOpen ? <ArrowBackOutlined /> : <ArrowForwardOutlined />}
      </button>
    </div>
  );
}
