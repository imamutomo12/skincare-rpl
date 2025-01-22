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

function App() {
  const { user, role, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  return (
    <ProductProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route
              path="/home"
              element={
                <ProtectedRoute requiredRole={role}>
                  {role === "admin" ? <HomeAdmin /> : <Home />}
                </ProtectedRoute>
              }
            />

            <Route
              path="/login"
              element={user ? <Navigate to="/home" replace /> : <Login />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/home" replace /> : <Register />}
            />
            <Route
              path="/"
              element={user ? <Navigate to="/home" replace /> : <LandingPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
