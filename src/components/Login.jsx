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

import { UserContext } from "../context/UserContext";
import logo1 from "../assets/logo1.png";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setRole, user, role } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
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
    <div className="flex grid py-12 grid-cols-1 h-full bg-krem  ">
      <div className=" mx-auto size-52">
        <img src={logo1}></img>
      </div>
      <div className=" mx-auto py-10 px-20  h-auto lg:h-max  rounded-2xl font-jura bg-dua text-2xl lg:text-4xl text-hitam ">
        <h2 className="text-center">
          <strong>Login</strong>
        </h2>
        <div className="grid grid-cols-1 ">
          <label className="block">
            <span className="left-0 text-xl ">Email</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1  block rounded-lg w-40 p-1.5 md:p-3 md:w-fit border-telorasin hover:border-hitam focus:border-hitam focus:ring-hitam bg-tiga"
            />
          </label>
          <label className="block ">
            <span className="left-0 text-xl ">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block rounded-lg w-40 p-1.5 md:p-3 md:w-fit border-telorasin hover:border-hitam focus:border-hitam focus:ring-hitam bg-tiga"
            />
          </label>
        </div>
        <div className="grid grid-cols-1">
          <button
            onClick={handleLogin}
            className="rounded-lg mt-6 p-1.5 text-2xl font-bold bg-taro hover:bg-gray-700 hover:shadow-md"
          >
            Login
          </button>
        </div>

        <div className="grid grid-cols-1">
          <label className="block text-sm text-center mt-5">
            Dont Have account?
          </label>
          <button
            onClick={() => navigate("/register")}
            className="rounded-lg  text-xl font-bold hover:text-zinc-600 bg-transparent"
          >
            Register
          </button>
        </div>

        <div className="grid grid-cols-1">
          <button className="rounded-lg mt-1  text-sm font-bold hover:text-zinc-600 bg-transparent">
            Forgot Passwordf
          </button>
        </div>
      </div>
    </div>
  );
}
