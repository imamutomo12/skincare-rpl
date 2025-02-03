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
      <div className="bg-dua rounded-3xl shadow-xl p-8 w-full max-w-lg font-jura text-hitam m-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          {isEditing ? "Edit Product" : "Product Details"}
        </h2>
        {isEditing ? (
          <div className="space-y-4">
            <label className="block">
              <span className="block text-xl mb-1">Nama Skincare:</span>
              <input
                type="text"
                value={editedProduct.nama}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, nama: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-telorasin bg-tiga hover:border-hitam focus:border-hitam focus:ring focus:ring-hitam transition-all"
              />
            </label>
            <label className="block">
              <span className="block text-xl mb-1">Kategori Skincare:</span>
              <select
                value={editedProduct.kategori}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    kategori: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-telorasin bg-tiga hover:border-hitam focus:border-hitam focus:ring focus:ring-hitam transition-all"
              >
                <option>Exfoliator</option>
                <option>Facewash</option>
                <option>Toner</option>
                <option>Serum</option>
                <option>Sunscreen</option>
              </select>
            </label>
            <label className="block">
              <span className="block text-xl mb-1">Harga:</span>
              <input
                type="number"
                value={editedProduct.harga}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    harga: parseFloat(e.target.value),
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-telorasin bg-tiga hover:border-hitam focus:border-hitam focus:ring focus:ring-hitam transition-all"
              />
            </label>
            <label className="block">
              <span className="block text-xl mb-1">Tipe Kulit:</span>
              <select
                value={editedProduct.tipeKulit}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    tipeKulit: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-telorasin bg-tiga hover:border-hitam focus:border-hitam focus:ring focus:ring-hitam transition-all"
              >
                <option>Oily Skin</option>
                <option>Dry Skin</option>
                <option>Normal Skin</option>
                <option>Mixed Skin</option>
              </select>
            </label>
            <label className="block">
              <span className="block text-xl mb-1">Deskripsi:</span>
              <textarea
                value={editedProduct.deskripsi}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    deskripsi: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-telorasin bg-tiga hover:border-hitam focus:border-hitam focus:ring focus:ring-hitam transition-all"
              />
            </label>
            <label className="block">
              <span className="block text-xl mb-1">
                Gambar: <small>(Upload Image)</small>
              </span>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full px-4 py-2 rounded-lg border border-telorasin bg-tiga hover:border-hitam focus:border-hitam focus:ring focus:ring-hitam transition-all"
              />
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <img
              src={product.gambar}
              alt={product.nama}
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
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

        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
          {isEditing ? (
            <button
              onClick={handleEdit}
              className="w-full sm:w-auto bg-taro text-empat px-6 py-2 rounded-full hover:bg-dongker transition-all font-bold"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto bg-taro text-empat px-6 py-2 rounded-full hover:bg-dongker transition-all font-bold"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => onDelete(product.id)}
            className="w-full sm:w-auto bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-all font-bold"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition-all font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
