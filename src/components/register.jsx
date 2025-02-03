import react, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          fullName: fullName,
          username: userName,
          email: user.email,
          role: "user",
        });
      }

      alert("Register Success");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-tiga flex items-center justify-center">
      <div className="bg-empat rounded-3xl shadow-xl py-10 px-8 sm:px-16 w-full max-w-md font-jura text-hitam">
        <h2 className="text-center text-4xl font-bold mb-8">Register</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="fullname" className="block text-xl mb-2">
              Fullname
            </label>
            <input
              id="fullname"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-telorasin bg-tiga hover:border-hitam focus:border-hitam focus:ring focus:ring-hitam transition-all"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-xl mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-telorasin bg-tiga hover:border-hitam focus:border-hitam focus:ring focus:ring-hitam transition-all"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xl mb-2">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-telorasin bg-tiga hover:border-hitam focus:border-hitam focus:ring focus:ring-hitam transition-all"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xl mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-telorasin bg-tiga hover:border-hitam focus:border-hitam focus:ring focus:ring-hitam transition-all"
            />
          </div>
          <button
            type="button"
            onClick={handleRegister}
            className="w-full py-3 rounded-full bg-taro text-empat font-bold text-xl hover:bg-dongker transition-all"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-lg">Already have an account?</span>
          <button
            onClick={() => navigate("/login")}
            className="ml-2 text-taro font-bold text-lg hover:text-dongker transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
