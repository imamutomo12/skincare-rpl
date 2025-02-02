import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { SidebarUser } from "./SidebarUser";
import { useState } from "react";
import { ProductDetailModalUser } from "./ProductDetailModalUser";
import { ProductCardUser } from "./ProductCardUser";
import { ProductContext } from "../context/ProductProvider";
import { useNavigate, useLocation } from "react-router-dom";

export function Home() {
  const { setUser, setRole, user, role, logout } = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [recommendationOn, setRecommendationOn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { products, updateProduct, deleteProduct, setSearchQuery } =
    useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const recommendedSkin = location.state?.skin;
  const handleToggleRecommendation = () => {
    if (!recommendationOn) {
      // User is trying to turn on recommendation.
      // If no recommended skin is available, redirect to analyze page.
      if (!recommendedSkin) {
        navigate("/analyze");
        return;
      }
    }
    setRecommendationOn((prev) => !prev);
  };

  // Filter products based on the recommendation filter state.
  // If recommendationOn is true, only show products that match the recommended skin type.
  const filteredProducts = console.log(recommendedSkin);
  recommendationOn && recommendedSkin
    ? setSearchQuery(recommendedSkin.toLowerCase())
    : products;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex h-screen">
        <SidebarUser
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        <div className=" flex-grow w-min overflow-y-auto justify-center h-screen bg-krem">
          <div className="flex justify-between items-center p-5">
            <h1 className=" font-bold font-jura text-lg md:text-3xl ">
              Home Admin
            </h1>
            <div className="md:flex justify-between order-last">
              <input
                type="text"
                className="rounded-lg w-40 p-1.5 md:p-3 md:w-fit border-telorasin hover:border-hitam focus:border-hitam focus:ring-hitam bg-tiga"
                placeholder="Cari Produk"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="items-center">
            <hr className=" h-1 bg-hitam" />
          </div>
          <div className="flex justify justify-between p-7 items-center">
            <h1 className="font-bold font-jura md:text-2xl">List Produk</h1>
            <button
              onClick={handleToggleRecommendation}
              className="hover:bg-gray-700 hover:shadow-md ml-4 font-jura font-bold text-sm md:text-xl bg-taro p-2 md:p-3 rounded-lg"
            >
              {recommendationOn
                ? "Show All Products"
                : "Show Recommended Products"}
            </button>
          </div>
          <div
            className=" mx-5 
                    grid grid-cols-1  px-5 py-14 rounded-lg md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCardUser
                  key={product.id}
                  product={product}
                  onOpenDetail={setSelectedProduct}
                />
              ))
            ) : (
              <p className="text-gray-600">No products found.</p>
            )}
          </div>

          {selectedProduct && (
            <ProductDetailModalUser
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </div>
      </div>
    </>
  );
}
