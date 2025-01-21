import { Navigate, useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center">
        <h1>Selamat Datang Di skincare app</h1>
        <button
          onClick={() => navigate("/login")}
          className="rounded-lg mt-6 text-2xl font-bold text-hitam bg-slate-600"
        >
          Login
        </button>
      </div>
    </>
  );
}
