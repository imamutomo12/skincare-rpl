import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { SidebarAdmin } from "./SidebarAdmin";
import { useState } from "react";
import { TambahProdukModal } from "./TambahProdukModal";
import { ProductCard } from "./ProductCard";
import { ProductContext } from "../context/ProductProvider";
import { ProductDetailModal } from "./ProductDetailModal";
import { AddRounded, SearchOutlined } from "@mui/icons-material";
export function HomeAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products, updateProduct, deleteProduct, setSearchQuery } =
    useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleProductEdit = (updatedProduct) => {
    updateProduct(updatedProduct);
    setSelectedProduct(null); // Close modal after saving
  };

  const handleProductDelete = (productId) => {
    deleteProduct(productId);
    setSelectedProduct(null); // Close modal after deleting
  };

  return (
    <>
      <>
        <div className="flex h-screen">
          <SidebarAdmin
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />

          <div className=" flex-grow w-min overflow-y-auto justify-center h-screen bg-krem">
            <div className="flex justify-between items-center p-5">
              <h1 className=" font-bold font-jura text-lg md:text-3xl ">
                Home Admin
              </h1>
              <div className="md:flex justify-between order-last">
                <div className="relative">
                  <input
                    type="text"
                    className="rounded-lg w-40 p-1.5 md:p-3 md:w-fit border-telorasin hover:border-hitam focus:border-hitam focus:ring-hitam bg-tiga pl-10 md:pl-12"
                    placeholder="Cari Produk"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <SearchOutlined className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="items-center">
              <hr className=" h-1 bg-hitam" />
            </div>
            <div className="flex justify justify-between p-7 items-center">
              <h1 className="font-bold font-jura md:text-2xl">List Produk</h1>
              <button
                onClick={openModal}
                className="hover:bg-gray-700 hover:shadow-md ml-4 font-jura font-bold justify-between items-center flex text-sm md:text-xl bg-taro p-2 md:p-3 rounded-lg"
              >
                <AddRounded className="relative top-[1px] items-center" />
                <p className="text-sm  md:text-xl">TambahProduk</p>
              </button>
            </div>
            <div
              className=" mx-5 
             grid grid-cols-1 bg-satu px-5 py-14 rounded-lg md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenDetail={setSelectedProduct}
                  />
                ))
              ) : (
                <p className="text-gray-600">No products found.</p>
              )}
            </div>
            {isModalOpen && <TambahProdukModal onClose={closeModal} />}
            {selectedProduct && (
              <ProductDetailModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onEdit={handleProductEdit}
                onDelete={handleProductDelete}
              />
            )}
          </div>
        </div>
      </>
    </>
  );
}
