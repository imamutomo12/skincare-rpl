// components/ForgotPassword.jsx
import { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import logo1 from "../assets/logo1.png";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Send password reset email with custom URL
      await sendPasswordResetEmail(auth, email, {
        url: "https://skincare-rpl.vercel.app/reset-password", // Custom URL
      });
      setMessage("Password reset email sent! Check your inbox.");
      setError("");
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <div className="flex grid py-12 grid-cols-1 h-full bg-krem  ">
      <div className=" mx-auto size-52">
        <img src={logo1}></img>
      </div>
      <div className=" mx-auto py-10 px-20  h-auto lg:h-max  rounded-2xl font-jura bg-dua text-2xl lg:text-4xl text-hitam ">
        <h2 className="text-center">
          <strong>Forgot Password</strong>
        </h2>
        <div className="grid grid-cols-1 ">
          <label className="block">
            <span className="left-0 text-xl ">Email Account</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1  block rounded-lg w-40 p-1.5 md:p-3 md:w-80 border-telorasin hover:border-hitam focus:border-hitam focus:ring-hitam bg-tiga"
            />
          </label>
        </div>
        <div className="grid grid-cols-1">
          <button
            onClick={handleSubmit}
            className="rounded-lg mt-6 p-1.5 text-2xl font-bold bg-taro hover:bg-gray-700 hover:shadow-md"
          >
            Send reset email
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
          {message && (
            <p className="text-green-700 text-lg text-center">{message}</p>
          )}
          {error && <p className="text-red-700 text-lg text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}
