import { useState, useContext } from "react";
import { UserContext } from "./context/UserContext";

import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Register } from "./components/register";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { LandingPage } from "./components/LandingPage";
import { HomeAdmin } from "./components/Homeadmin";
import { SidebarAdmin } from "./components/SidebarAdmin";
import { ProductProvider } from "./context/ProductProvider";
import Analyze from "./components/Analyze";
import { SkinProvider } from "./context/SkinProvider";
import { ForgotPassword } from "./components/ForgotPassword";
import { PasswordReset } from "./components/PasswordReset";
import LoadingPage from "./components/LoadingPage";
import { ProfileUser } from "./components/ProfileUser";
import ProfileAdmin from "./components/ProfileAdmin";
import { DashboardLayout } from "./components/DashboardLayout";
import { SidebarUser } from "./components/SidebarUser";

function App() {
  const { user, role, loading } = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to control (toggle) the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <ProductProvider>
      <SkinProvider>
        <BrowserRouter>
          <div className="relative flex h-screen">
            {/* Render Sidebar only if not loading or if the user is logged in */}
            {loading || (user && role) ? (
              role === "admin" ? (
                <SidebarAdmin
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              ) : (
                <SidebarUser
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              )
            ) : null}

            <div className="flex-grow overflow-y-auto relative">
              {/* Show loading page if loading is true */}
              {loading ? (
                <div className="">
                  <LoadingPage />
                </div>
              ) : (
                <Routes>
                  <Route element={<ProtectedRoute requiredRole={role} />}>
                    <Route
                      path="/home"
                      element={role === "admin" ? <HomeAdmin /> : <Home />}
                    />
                    <Route
                      path="/profile"
                      element={
                        role === "admin" ? <ProfileAdmin /> : <ProfileUser />
                      }
                    />
                    <Route path="/analyze" element={<Analyze />} />
                  </Route>

                  <Route
                    path="/forgot-password"
                    element={
                      user ? (
                        <Navigate to="/home" replace />
                      ) : (
                        <ForgotPassword />
                      )
                    }
                  />

                  <Route
                    path="/password-reset"
                    element={
                      user ? <Navigate to="/home" replace /> : <PasswordReset />
                    }
                  />

                  <Route
                    path="/login"
                    element={user ? <Navigate to="/home" replace /> : <Login />}
                  />
                  <Route
                    path="/register"
                    element={
                      user ? <Navigate to="/home" replace /> : <Register />
                    }
                  />
                  <Route
                    path="/"
                    element={
                      user ? <Navigate to="/home" replace /> : <LandingPage />
                    }
                  />
                </Routes>
              )}
            </div>
          </div>
        </BrowserRouter>
      </SkinProvider>
    </ProductProvider>
  );
}

export default App;
