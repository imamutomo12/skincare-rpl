// src/context/SkinProvider.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { UserContext } from "./UserContext";

export const SkinContext = createContext();

export const SkinProvider = ({ children }) => {
  const { user, loading: userLoading } = useContext(UserContext);
  const [skinData, setSkinData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (userLoading) return; // Wait until user authentication is checked
    if (!user) {
      setSkinData(null);
      setLoading(false);
      return;
    }

    const fetchSkinData = async () => {
      setLoading(true);
      try {
        const skinDocRef = doc(db, "skin", user.uid);

        const skinDocSnapshot = await getDoc(skinDocRef);

        if (skinDocSnapshot.exists()) {
          setSkinData(skinDocSnapshot.data());
        } else {
          setSkinData(null);
        }
      } catch (error) {
        setSkinData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSkinData();
  }, [user, userLoading]); // Re-fetch when user changes

  return (
    <SkinContext.Provider value={{ skinData, loading }}>
      {children}
    </SkinContext.Provider>
  );
};
