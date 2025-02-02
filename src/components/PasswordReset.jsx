import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  getAuth,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
import logo1 from "../assets/logo1.png";

export function PasswordReset() {
  const [newPassword, setNewPassword] = useState("");
  const [oobCode, setOobCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract query parameters from the URL
    const params = new URLSearchParams(location.search);
    const code = params.get("oobCode");
    if (code) setOobCode(code);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verify the OOB code
      const auth = getAuth();
      await verifyPasswordResetCode(auth, oobCode);
      // Confirm password reset
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess(true);
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div className="flex grid py-12 grid-cols-1 h-full bg-krem  ">
      <div className=" mx-auto size-52">
        <img src={logo1}></img>
      </div>
      <div className=" mx-auto py-10 px-20  h-auto lg:h-max  rounded-2xl font-jura bg-dua text-2xl lg:text-4xl text-hitam ">
        <h2 className="text-center">
          <strong>Reset Password</strong>
        </h2>
        {success ? (
          <div>
            <p className="text-green-700 text-lg text-center">
              Password reset success!
            </p>
            <button
              onClick={handleSubmit}
              className="rounded-lg mt-6 p-1.5 text-2xl font-bold bg-taro hover:bg-gray-700 hover:shadow-md"
            >
              Login now
            </button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 ">
              <label className="block">
                <span className="left-0 text-xl ">New Password</span>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1  block rounded-lg w-40 p-1.5 md:p-3 md:w-80 border-telorasin hover:border-hitam focus:border-hitam focus:ring-hitam bg-tiga"
                />
              </label>
            </div>
            <div className="grid grid-cols-1">
              <button
                onClick={() => navigate("/login")}
                className="rounded-lg mt-6 p-1.5 text-2xl font-bold bg-taro hover:bg-gray-700 hover:shadow-md"
              >
                Reset Password
              </button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
