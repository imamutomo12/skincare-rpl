import React from "react";
import logo1 from "../assets/kahf.jpg";

export function ProductCardUser({ product, onOpenDetail }) {
  return (
    <div
      className="bg-empat shadow-md rounded-lg px-4 py-6 flex flex-col items-center text-center font-jura cursor-pointer hover:shadow-lg hover:bg-dua transition-all duration-300 border border-telorasin"
      onClick={() => onOpenDetail(product)}
    >
      <img
        src={product.gambar}
        alt={product.nama}
        className="size-48 md:size-60 object-cover rounded-lg mb-4 hover:scale-105 transition-transform"
      />
      <h2 className="font-bold text-hitam text-lg md:text-xl mb-2">
        {product.nama}
      </h2>
      <p className="text-hitam/70 text-sm md:text-base mb-2">
        {product.kategori}
      </p>
      <p className="text-taro font-semibold text-base md:text-lg">
        {product.tipeKulit}
      </p>
    </div>
  );
}
