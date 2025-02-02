// src/context/SkinProvider.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { UserContext } from "./UserContext";

export const SkinContext = createContext();

export const SkinProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [skinData, setSkinData] = useState(null);

  useEffect(() => {
    if (!user || !user.uid) {
      setSkinData(null);
      return;
    }
    // Subscribe to the "skin" document for the current user
    const skinDocRef = doc(db, "skin", user.uid);
    const unsubscribe = onSnapshot(
      skinDocRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setSkinData(docSnapshot.data());
        } else {
          setSkinData(null);
        }
      },
      (error) => {
        console.error("Error fetching skin data:", error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return (
    <SkinContext.Provider value={{ skinData }}>{children}</SkinContext.Provider>
  );
};
