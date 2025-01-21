import React, { useState, useContext } from "react";
import { ProductContext } from "../context/ProductProvider";

export function ProductDetailModal({ product, onClose, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const { updateProduct, deleteProduct } = useContext(ProductContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async () => {
    try {
      await updateProduct(product.id, editedProduct);
      setIsEditing(false);
    } catch (error) {
      alert("Failed to update product.");
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-auto m-12">
        <h2 className="font-bold text-lg mb-4">
          {isEditing ? "Edit Product" : "Product Details"}
        </h2>
        {isEditing ? (
          <div>
            <label className="block mb-2">
              Nama Skincare:
              <input
                type="text"
                value={editedProduct.nama}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, nama: e.target.value })
                }
                className="border rounded w-full p-2"
              />
            </label>
            <label className="block mb-2">
              Kategori Skincare:
              <select
                value={editedProduct.kategori}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    kategori: e.target.value,
                  })
                }
                className="border rounded p-2 w-full"
              >
                <option>Exfoliator</option>
                <option>Facewash</option>
                <option>Toner</option>
                <option>Serum</option>
                <option>Sunscreen</option>
              </select>
            </label>
            <label className="block mb-2">
              Harga:
              <input
                type="number"
                value={editedProduct.harga}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    harga: parseFloat(e.target.value),
                  })
                }
                className="border rounded w-full p-2"
              />
            </label>
            <label className="block mb-2">
              Tipe Kulit:
              <select
                value={editedProduct.tipeKulit}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    tipeKulit: e.target.value,
                  })
                }
                className="border rounded p-2 w-full"
              >
                <option>Oily Skin</option>
                <option>Dry Skin</option>
                <option>Normal Skin</option>
                <option>Mixed Skin</option>
              </select>
            </label>
            <label className="block mb-2">
              Deskripsi:
              <textarea
                value={editedProduct.deskripsi}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    deskripsi: e.target.value,
                  })
                }
                className="border rounded p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Gambar :<label>Gambar (Upload Image)</label>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="border rounded p-2 w-full"
              />
            </label>
          </div>
        ) : (
          <div>
            <img
              src={product.gambar}
              alt={product.nama}
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <p>
              <strong>Nama Skincare:</strong> {product.nama}
            </p>
            <p>
              <strong>Kategori:</strong> {product.kategori}
            </p>
            <p>
              <strong>Harga:</strong> Rp {product.harga.toLocaleString()}
            </p>
            <p>
              <strong>Tipe Kulit:</strong> {product.tipeKulit}
            </p>
            <p>
              <strong>Deskripsi:</strong> {product.deskripsi}
            </p>
          </div>
        )}
        <div className="mt-4 flex justify-between">
          {isEditing ? (
            <button
              onClick={handleEdit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => onDelete(product.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
