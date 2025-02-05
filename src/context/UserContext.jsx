import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [role, setRole] = useState(""); // "admin" or "user"
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          // Fetch user document from Firestore
          const userDoc = await getDoc(doc(db, "Users", currentUser.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setRole(userData.role || null);
            setFullName(userData.fullName || "User");
            setEmail(userData.email || null);
          } else {
            setRole(null);
            setFullName("");
          }
          console.log("fetch data");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
        setRole(null);
        setFullName("");
      }
      setLoading(false);
    });

    // Cleanup on component unmount
    return () => unsubscribe();
  }, [user]);
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user from context
      setRole(null); // Clear role from context
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, role, email, fullName, loading, setUser, setRole, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
