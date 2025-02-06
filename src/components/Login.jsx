import react, { useState, useContext, useEffect } from "react";
import { auth, db } from "../firebase";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import { EmailOutlined, LockOutlined, LoginRounded } from "@mui/icons-material";
import { UserContext } from "../context/UserContext";
import logo1 from "../assets/logo1.png";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setRole, setLoading, setIsAuthenticated, user, role } =
    useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setUser(user.user);
      const userDoc = await getDoc(doc(db, "Users", user.uid));
      if (userDoc.exists()) {
        const userRole = userDoc.data().role;

        setRole(userRole); // Set role in context
        navigate(location.state?.from || "/home", { replace: true });
      } else {
        console.log("User document not found in Firestore");
        setRole(null); // If no role exists, set it to null
      }
    } catch (error) {
      console.log(error.message);
      alert("invalid credential");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-tiga p-4">
      <div className="w-48 h-48 mb-8 animate-fade-in">
        <img
          src={logo1}
          alt="Skincare AI Logo"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="w-full max-w-md bg-empat rounded-xl shadow-lg p-8 md:p-12 font-jura transition-all duration-300 hover:shadow-xl">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-hitam mb-8">
          Welcome Back
        </h2>

        <div className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-lg font-semibold text-hitam">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-telorasin hover:border-hitam focus:border-hitam focus:ring-2 focus:ring-hitam bg-tiga placeholder:text-satu transition-all duration-300"
                placeholder="example@mail.com"
              />
              <EmailOutlined className="absolute right-3 top-1/2 -translate-y-1/2 text-satu" />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-lg font-semibold text-hitam">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-telorasin hover:border-hitam focus:border-hitam focus:ring-2 focus:ring-hitam bg-tiga placeholder:text-satu transition-all duration-300"
                placeholder="••••••••"
              />
              <LockOutlined className="absolute right-3 top-1/2 -translate-y-1/2 text-satu" />
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-taro text-empat rounded-lg font-bold text-xl hover:bg-dongker transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <LoginRounded />
            Sign In
          </button>

          {/* Additional Links */}
          <div className="flex flex-col items-center space-y-3 mt-4">
            <button
              onClick={() => navigate("/register")}
              className="text-taro hover:text-dongker text-sm font-semibold transition-colors duration-300"
            >
              Don't have an account? Register Now
            </button>

            <button
              onClick={() => navigate("/forgot-password")}
              className="text-satu hover:text-hitam text-xs transition-colors duration-300"
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
