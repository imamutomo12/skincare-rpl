import React, { useState, useContext } from "react";
import { ProductContext } from "../context/ProductProvider";

export function ProductDetailModalUser({ product, onClose, onEdit, onDelete }) {
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
      <div className="bg-white rounded-lg shadow-lg m-6 w-fit md:w-8/12 overflow-y-auto">
        <div className="p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-center">
              <img
                src={product.gambar}
                alt={product.nama}
                className="object-cover rounded-lg w-full h-full max-h-96"
              />
            </div>
            <div className="flex flex-col justify-center font-jura text-hitam space-y-3">
              <p className="text-sm md:text-xl">
                <strong>Nama Skincare:</strong> {product.nama}
              </p>
              <p className="text-sm md:text-xl">
                <strong>Kategori:</strong> {product.kategori}
              </p>
              <p className="text-sm md:text-xl">
                <strong>Harga:</strong> Rp {product.harga.toLocaleString()}
              </p>
              <p className="text-sm md:text-xl">
                <strong>Tipe Kulit:</strong> {product.tipeKulit}
              </p>
              <p className="text-sm md:text-base text-justify">
                <strong>Deskripsi:</strong> {product.deskripsi}
              </p>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 flex justify-end border-t border-hitam/20">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 font-jura text-base md:text-xl rounded hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
