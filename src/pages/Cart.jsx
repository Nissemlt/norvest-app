import { ArrowRight, Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const updateQty = (id, amount) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty + amount }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = () => {
    if (cart.length === 0) return;

    const order = {
      id: Date.now(),
      items: cart,
      total,
      status: "En attente",
      date: new Date().toLocaleDateString("fr-DZ"),
    };

    const orders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    localStorage.setItem(
      "orders",
      JSON.stringify([order, ...orders])
    );

    setCart([]);
    navigate("/confirmation");
  };

  return (
    <div className="min-h-screen bg-[#F8F9F7]">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-primary text-white shadow-md">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">

          <button
            onClick={() => navigate("/")}
            className="p-1"
          >
            <ArrowRight size={24} />
          </button>

          <h1 className="text-xl font-bold">
            طلبك
          </h1>

        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-5">

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">

            <div className="text-6xl mb-4">
              🛒
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              السلة فارغة
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              مازال ما ضفت حتى منتج للطلب
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-5 bg-primary text-white px-6 py-3 rounded-xl font-medium"
            >
              تصفح المنتجات
            </button>

          </div>
        ) : (
          <>
            {/* Products */}
            <div className="space-y-3">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100"
                >

                  <div className="flex gap-3">

                    <div className="w-20 h-20 bg-primary-pale rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-4xl">
                        {item.emoji}
                      </span>
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between gap-2">

                        <div>
                          <h3 className="font-bold text-gray-800">
                            {item.name}
                          </h3>

                          <p className="text-xs text-gray-400">
                            {item.price} DA / {item.unit}
                          </p>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 p-1"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                      <div className="flex items-center justify-between mt-3">

                        <span className="font-bold text-primary">
                          {item.price * item.qty} DA
                        </span>

                        <div className="flex items-center gap-2">

                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="font-bold w-6 text-center">
                            {item.qty}
                          </span>

                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center"
                          >
                            <Plus size={16} />
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* Total */}
            <div className="bg-white rounded-2xl p-4 mt-5 shadow-sm">

              <div className="flex justify-between items-center">
                <span className="text-gray-500">
                  المجموع
                </span>

                <span className="text-2xl font-bold text-primary">
                  {total} DA
                </span>
              </div>

              <button
                onClick={placeOrder}
                className="w-full mt-4 bg-gold text-white py-3.5 rounded-xl font-bold"
              >
                تأكيد الطلب
              </button>

            </div>
          </>
        )}

      </main>
    </div>
  );
}

export default Cart;