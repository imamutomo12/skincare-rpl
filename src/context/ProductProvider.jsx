import React, { useEffect, createContext, useState, useMemo } from "react";
import { db } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };
    fetchProducts();
  }, []);

  const addProduct = async (newProduct, imageFile) => {
    try {
      const imageRef = ref(
        storage,
        `products/${newProduct.nama}-${Date.now()}`
      );
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      const productData = { ...newProduct, gambar: imageUrl };
      const docRef = await addDoc(collection(db, "products"), productData);

      setProducts((prev) => [...prev, { id: docRef.id, ...productData }]);
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      [product.nama, product.kategori, product.tipeKulit, product.deskripsi]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const updateProduct = async (id, updatedData) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, updatedData);
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, ...updatedData } : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        setProducts,
        setSearchQuery,
        searchQuery,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
