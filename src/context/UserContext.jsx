import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // "admin" or "user"
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Fetch user document from Firestore
          const userDoc = await getDoc(doc(db, "Users", currentUser.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: currentUser.uid, // Ensures user object is structured properly
              email: currentUser.email,
              role: userData.role || null,
              fullName: userData.fullName || "User",
            });
            setRole(userData.role || null);
            setFullName(userData.fullName || "User");
            setEmail(userData.email || null);
          } else {
            console.warn("User document not found in Firestore.");
            setUser(currentUser); // Keep auth user but without Firestore data
            setRole(null);
            setFullName("User");
            setEmail(currentUser.email || null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(currentUser);
        }
      } else {
        console.log("No user is logged in.");
        setUser(null);
        setRole(null);
        setFullName("");
        setEmail("");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); // ✅ Only run once when the component mounts
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
