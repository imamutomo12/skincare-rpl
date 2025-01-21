import React, { useState, useContext } from "react";

import { ProductContext } from "../context/ProductProvider";

export function TambahProdukModal({ onClose }) {
  const { addProduct } = useContext(ProductContext);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("Exfoliator");
  const [skinType, setSkinType] = useState("Oily Skin");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    const newProduct = {
      nama: productName,
      kategori: productCategory,
      harga: parseFloat(productPrice),
      tipeKulit: skinType,
      deskripsi: description,
    };

    try {
      await addProduct(newProduct, imageFile);
      onClose();
    } catch (error) {
      alert("Failed to add product.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-7 md:p-14 w-fit">
        <h2 className="text-lg font-bold mb-4">Tambah Produk</h2>
        <form>
          <div className="md:grid grid-cols-2 gap-5 ">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Nama Skincare
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="rounded-lg w-fit p-1.5 md:p-3 md:w-80 border-telorasin hover:border-hitam focus:border-hitam focus:ring-hitam bg-tiga"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Kategori Skincare
              </label>
              <select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="rounded-lg w-fit p-1.5 md:p-3 md:w-80 border-telorasin hover:border-hitam focus:border-hitam focus:ring-hitam bg-tiga"
              >
                <option>Exfoliator</option>
                <option>Facewash</option>
                <option>Toner</option>
                <option>Serum</option>
                <option>Sunscreen</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Harga
              </label>
              <input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="rounded-lg w-fit p-1.5 md:p-3 md:w-80 border-telorasin hover:border-hitam focus:border-hitam focus:ring-hitam bg-tiga"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Tipe Kulit
              </label>
              <select
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
                className="rounded-lg w-fit p-1.5 md:p-3 md:w-80 border-telorasin hover:border-hitam focus:border-hitam focus:ring-hitam bg-tiga"
              >
                <option>Oily Skin</option>
                <option>Dry skin</option>
                <option>Normal skin</option>
                <option>Mixed skin</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Deskripsi
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-lg w-fit p-1.5 md:p-3 md:w-80 border-telorasin hover:border-hitam focus:border-hitam focus:ring-hitam bg-tiga"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Gambar
              </label>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                required
                className="border rounded p-2 w-full"
              />
            </div>
          </div>
        </form>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 bg-gray-500 text-white p-2 rounded-lg"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-taro text-white p-2 rounded-lg"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
