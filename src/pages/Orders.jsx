import { useEffect, useState } from "react";
import { ArrowRight, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusConfig = {
  "En attente": {
    label: "في الانتظار",
    className: "bg-yellow-100 text-yellow-700",
  },
  "Confirmé": {
    label: "مؤكد",
    className: "bg-blue-100 text-blue-700",
  },
  "Livré": {
    label: "تم التسليم",
    className: "bg-green-100 text-green-700",
  },
};

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    setOrders(savedOrders);
  }, []);

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
            طلباتي
          </h1>

        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-5">

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">

            <Package
              size={60}
              className="mx-auto text-gray-300"
            />

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              ما عندك حتى طلب
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              الطلبات اللي تديرها راح تظهر هنا
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-5 bg-primary text-white px-6 py-3 rounded-xl font-medium"
            >
              تصفح المنتجات
            </button>

          </div>
        ) : (
          <div className="space-y-4">

            {orders.map((order) => {

              const status =
                statusConfig[order.status] ||
                statusConfig["En attente"];

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                >

                  {/* Order header */}
                  <div className="flex justify-between items-start">

                    <div>
                      <p className="text-xs text-gray-400">
                        رقم الطلب
                      </p>

                      <h2 className="font-bold text-gray-800">
                        #{String(order.id).slice(-4)}
                      </h2>

                      <p className="text-xs text-gray-400 mt-1">
                        {order.date}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${status.className}`}
                    >
                      {status.label}
                    </span>

                  </div>

                  {/* Items */}
                  <div className="border-t border-gray-100 mt-4 pt-3 space-y-3">

                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
                      >

                        <div className="flex items-center gap-2">

                          <div className="w-10 h-10 bg-primary-pale rounded-lg flex items-center justify-center">
                            <span className="text-xl">
                              {item.emoji}
                            </span>
                          </div>

                          <div>
                            <p className="font-medium text-gray-800 text-sm">
                              {item.name}
                            </p>

                            <p className="text-xs text-gray-400">
                              {item.qty} {item.unit}
                            </p>
                          </div>

                        </div>

                        <span className="font-bold text-primary text-sm">
                          {item.price * item.qty} DA
                        </span>

                      </div>
                    ))}

                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-100 mt-4 pt-3 flex justify-between">

                    <span className="font-medium text-gray-600">
                      المجموع
                    </span>

                    <span className="font-bold text-lg text-primary">
                      {order.total} DA
                    </span>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </main>
    </div>
  );
}

export default Orders;