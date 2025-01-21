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
    <div className="flex items-center justify-center h-svh bg-krem">
      <div className="  mx-auto py-10 px-20  h-3/4 lg:h-max bg-dua rounded-lg font-jura  text-2xl lg:text-4xl text-hitam ">
        <h2 className="text-center">
          <strong>Register</strong>
        </h2>
        <div className="grid grid-cols-2 gap-x-3 ">
          <label className="block">
            <span className="left-0 text-xl ">Fullname</span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1  block rounded-lg w-40 p-1.5 md:p-3 md:w-fit border-telorasin hover:border-hitam focus:border-hitam focus:ring-hitam bg-tiga"
            />
          </label>
          <label className="block ">
            <span className="left-0 text-xl ">Username</span>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1  block rounded-lg w-40 p-1.5 md:p-3 md:w-fit border-telorasin hover:border-hitam focus:border-hitam focus:ring-hitam bg-tiga"
            />
          </label>
          <label className="block">
            <span className="left-0 text-xl ">email</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1  block rounded-lg w-40 p-1.5 md:p-3 md:w-fit border-telorasin hover:border-hitam focus:border-hitam focus:ring-hitam bg-tiga"
            />
          </label>
          <label className="block">
            <span className="left-0 text-xl ">Password</span>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1  block rounded-lg w-40 p-1.5 md:p-3 md:w-fit border-telorasin hover:border-hitam focus:border-hitam focus:ring-hitam bg-tiga"
            />
          </label>
        </div>
        <div className="grid grid-cols-1">
          <button
            onClick={handleRegister}
            className="rounded-lg mt-6 p-1.5 text-2xl font-bold bg-taro hover:bg-gray-700 hover:shadow-md"
          >
            Register
          </button>
        </div>

        <div className="grid grid-cols-1">
          <label className="block text-sm text-center mt-5">
            Already Have account?
          </label>
          <button
            onClick={() => navigate("/home")}
            className="rounded-lg  text-xl font-bold hover:text-zinc-600 bg-transparent"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
