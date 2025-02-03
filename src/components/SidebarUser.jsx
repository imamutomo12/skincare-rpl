import {
  ArrowBackOutlined,
  ArrowForwardOutlined,
  FaceRetouchingNaturalRounded,
  HomeRounded,
  LogoutRounded,
  ManageAccountsRounded,
  Person2Rounded,
} from "@mui/icons-material";
import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
export function SidebarUser({ toggleSidebar, isSidebarOpen }) {
  const { fullName, logout } = useContext(UserContext);

  return (
    <div
      className={`${
        isSidebarOpen ? "w-72" : "w-0"
      } bg-taro text-hitam h-screen transition-all duration-300  flex flex-col`}
    >
      <nav className="flex-grow text-center font-jura font-bold text-2xl">
        <ul>
          <li className="p-4  text-wrap font-bold">
            <h1 className="text-5xl">Halo</h1>

            <h2 className="text-sm text-center md:text-lg mt-2">
              <Person2Rounded className="mb-0.5" /> {fullName}
            </h2>
          </li>
          <br></br>
        </ul>
        <ul>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">
            <HomeRounded className="justify-center mb-1" />
            <a href="/home"> Home</a>
          </li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">
            <FaceRetouchingNaturalRounded classname="justify-center mb-1" />
            <a href="/analyze">Analyze my face</a>
          </li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">
            <ManageAccountsRounded className="mb-1" />
            <a href="/profile">My Account</a>
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
          isSidebarOpen ? "left-36 md:left-72 " : "left-1"
        } bg-taro text-hitam hover:bg-gray-700  font-bold p-3 mx-2 sm:z-20 rounded-md shadow-lg z-50 transition-all duration-300`}
      >
        {isSidebarOpen ? <ArrowBackOutlined /> : <ArrowForwardOutlined />}
      </button>
    </div>
  );
}
