import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { SidebarUser } from "./SidebarUser";
import { useState, useEffect } from "react";
import { ProductDetailModalUser } from "./ProductDetailModalUser";
import { ProductCardUser } from "./ProductCardUser";
import { ProductContext } from "../context/ProductProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { SkinContext } from "../context/SkinProvider";
import { RecommendOutlined, SearchOutlined } from "@mui/icons-material";

export function Home() {
  const { setUser, setRole, user, role, logout } = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { skinData } = useContext(SkinContext);
  const [recommendationOn, setRecommendationOn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { products, updateProduct, deleteProduct, setSearchQuery } =
    useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [recommendedSkin, setRecommendedSkin] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const skinTypes = ["Oily Skin", "Dry skin", "Normal skin", "Mixed skin"];
  useEffect(() => {
    if (location.state?.skin) {
      // If the recommended skin type was passed via navigation state
      setRecommendedSkin(location.state.skin);
    } else if (skinData?.skin !== undefined) {
      // If it's available in Firestore, use that
      setRecommendedSkin(skinTypes[skinData.skin]);
    }
  }, [location.state, skinData]);

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

  useEffect(() => {
    if (recommendationOn && recommendedSkin) {
      setSearchQuery(recommendedSkin.toLowerCase());
    } else {
      setSearchQuery(""); // Reset to show all products
    }
  }, [recommendationOn, recommendedSkin]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="flex-grow w-min overflow-y-auto justify-center h-screen bg-tiga">
          <div className="flex justify-between items-center p-5">
            <h1 className="font-bold font-jura text-hitam text-lg md:text-3xl">
              Home
            </h1>
            <div className="md:flex justify-between order-last">
              <div className="relative">
                <input
                  type="text"
                  className="rounded-lg w-40 p-1.5 md:p-3 md:w-fit border-telorasin hover:border-hitam focus:border-hitam focus:ring-hitam bg-empat pl-10 md:pl-12 font-jura"
                  placeholder="Cari Produk"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchOutlined className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-satu" />
              </div>
            </div>
          </div>
          <div className="items-center">
            <hr className="h-0.5 bg-hitam/20" />
          </div>
          <div className="flex justify-between p-7 items-center">
            <h1 className="font-bold font-jura text-hitam md:text-2xl">
              List Produk
            </h1>
            <button
              onClick={handleToggleRecommendation}
              className="hover:bg-dongker hover:text-empat ml-4 font-jura font-bold flex items-center gap-2 text-sm md:text-xl bg-taro text-empat p-2 md:p-3 rounded-lg transition-all"
            >
              <RecommendOutlined className="text-empat" />
              {recommendationOn ? "Show All" : "Recommended"}
            </button>
          </div>
          <div className="mx-5 grid grid-cols-1 px-5 py-14 rounded-lg md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCardUser
                  key={product.id}
                  product={product}
                  onOpenDetail={setSelectedProduct}
                />
              ))
            ) : (
              <p className="text-satu font-jura">No products found.</p>
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
