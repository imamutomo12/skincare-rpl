import React, { useEffect, useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({
  children,
  requiredRole,

  userRole,
}) => {
  const { user, role, loading } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    // Prevent back navigation after redirection
    if (!user || role !== requiredRole) {
      window.history.pushState(null, "", location.pathname); // Replace current page in history
      window.onpopstate = function () {
        window.history.go(1); // Prevent back navigation
      };
    }

    return () => {
      window.onpopstate = null; // Cleanup the handler when component unmounts
    };
  }, [user, role, location, requiredRole]);

  if (loading) return <div>Loading...</div>;
  if (
    user &&
    (location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/")
  ) {
    // Redirect logged-in user from login or register page
    return <Navigate to="/home" replace />;
  }

  if (!user) {
    console.log("User role not found, redirecting to login.");
    return <Navigate to="/login" replace />;
  }

  if (role !== requiredRole) {
    console.log(
      `Access denied. User role: ${role}, Required role: ${requiredRole}`
    );
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />; // Render protected content
};

export default ProtectedRoute;
