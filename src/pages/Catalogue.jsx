import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Leaf } from "lucide-react";
import { products } from "../data/products";

const categories = ["الكل", "خضر", "فواكه"];

function Catalogue({ cart, setCart }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.includes(search) ||
      product.nameF.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "الكل" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <div className="min-h-screen bg-[#F8F9F7]">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-primary text-white shadow-md">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          
          <div className="flex items-center gap-2">
            <Leaf size={28} />
            <div>
              <h1 className="font-bold text-xl">NORVEST</h1>
              <p className="text-xs text-green-100">
                منتجات فلاحية طازجة
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/cart")}
            className="relative bg-gold text-white p-3 rounded-full shadow"
          >
            <ShoppingCart size={22} />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-lg mx-auto px-4 py-5">

        {/* Title */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-primary">
            المنتجات
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            اختار المنتجات اللي تحتاجها
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search
            size={20}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن منتج..."
            className="w-full bg-white border border-gray-200 rounded-xl py-3 pr-10 pl-4 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition ${
                category === cat
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-3">

          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >

              {/* Product image */}
              <div className="h-32 bg-primary-pale flex items-center justify-center">
                <span className="text-6xl">
                  {product.emoji}
                </span>
              </div>

              {/* Product info */}
              <div className="p-3">

                <h3 className="font-bold text-gray-800">
                  {product.name}
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  {product.nameF}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  {product.supplier}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="font-bold text-primary">
                      {product.price} DA
                    </span>

                    <span className="text-xs text-gray-400">
                      /{product.unit}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full mt-3 bg-primary text-white py-2.5 rounded-xl font-medium text-sm hover:bg-primary-light transition"
                >
                  + أضف للطلب
                </button>

              </div>
            </div>
          ))}

        </div>

        {/* Empty result */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-5xl mb-3">🔎</div>
            <p>ما لقيناش هذا المنتج</p>
          </div>
        )}

      </main>
    </div>
  );
}

export default Catalogue;