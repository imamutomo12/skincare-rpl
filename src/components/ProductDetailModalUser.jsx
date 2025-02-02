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
      <div className="bg-white rounded-lg p-6 w-fit md:w-8/12 h-fit m-12">
        <br />
        <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 gap-x-1  overflow-y-auto">
          <div className="flex mx-0 justify-center">
            <img
              src={product.gambar}
              alt={product.nama}
              className="size-96 object-cover "
            />
          </div>
          <div className="grid items-center grid-cols-1 flex font-jura  ">
            <p className="text-[10px] md:text-xl text-left">
              <strong>Nama Skincare:</strong> {product.nama}
            </p>
            <p className="text-[10px] md:text-xl text-left">
              <strong>Kategori:</strong> {product.kategori}
            </p>
            <p className="text-[10px] md:text-xl text-left">
              <strong>Harga:</strong> Rp {product.harga.toLocaleString()}
            </p>
            <p className="text-[10px] md:text-xl text-left">
              <strong>Tipe Kulit:</strong> {product.tipeKulit}
            </p>
            <p className="text-[10px] md:text-sm text-justify">
              <strong>Deskripsi:</strong> {product.deskripsi}
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 font-jura text-2xl order-last rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
