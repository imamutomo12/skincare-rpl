import React from "react";
import logo1 from "../assets/kahf.jpg";

export function ProductCard({ product, onOpenDetail }) {
  return (
    <div
      className="bg-dua shadow-md rounded-lg px-4 py-10 flex flex-col items-center text-center font-jura cursor-pointer hover:shadow-lg transition"
      onClick={() => onOpenDetail(product)}
    >
      <img
        src={product.gambar}
        alt={product.nama}
        className="size-60 object-cover rounded-lg mb-3"
      />
      <h2 className="font-bold text-xl mb-2">{product.nama}</h2>
      <p className="text-gray-600 text-sm mb-2">{product.kategori}</p>
      <p className="text-gray-800 text-lg">{product.tipeKulit}</p>
    </div>
  );
}
