import { useEffect, useState } from "react";
import { ArrowRight, Check, PackageCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const savedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    setOrders(savedOrders);
  };

  const updateStatus = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? { ...order, status: newStatus }
        : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );
  };

  const pendingOrders = orders.filter(
    (order) => order.status === "En attente"
  );

  const confirmedOrders = orders.filter(
    (order) => order.status === "Confirmé"
  );

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

          <div>
            <h1 className="text-xl font-bold">
              NORVEST Admin
            </h1>

            <p className="text-xs text-green-100">
              إدارة الطلبات
            </p>
          </div>

        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-5">

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3 mb-5">

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">
              في الانتظار
            </p>

            <p className="text-3xl font-bold text-yellow-600 mt-1">
              {pendingOrders.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">
              مؤكدة
            </p>

            <p className="text-3xl font-bold text-blue-600 mt-1">
              {confirmedOrders.length}
            </p>
          </div>

        </div>

        {/* Orders */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">

            <PackageCheck
              size={60}
              className="mx-auto text-gray-300"
            />

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              ما كاش طلبات
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              الطلبات الجديدة راح تظهر هنا
            </p>

          </div>
        ) : (
          <div className="space-y-4">

            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >

                {/* Order info */}
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
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      order.status === "En attente"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Confirmé"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status === "En attente"
                      ? "في الانتظار"
                      : order.status === "Confirmé"
                      ? "مؤكد"
                      : "تم التسليم"}
                  </span>

                </div>

                {/* Products */}
                <div className="border-t border-gray-100 mt-4 pt-3 space-y-2">

                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >

                      <span className="text-gray-700">
                        {item.emoji} {item.name}
                        {" × "}
                        {item.qty}
                      </span>

                      <span className="font-medium text-gray-800">
                        {item.price * item.qty} DA
                      </span>

                    </div>
                  ))}

                </div>

                {/* Total */}
                <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between">

                  <span className="font-medium text-gray-600">
                    المجموع
                  </span>

                  <span className="font-bold text-primary">
                    {order.total} DA
                  </span>

                </div>

                {/* Actions */}
                {order.status === "En attente" && (
                  <button
                    onClick={() =>
                      updateStatus(order.id, "Confirmé")
                    }
                    className="w-full mt-4 bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <Check size={19} />
                    تأكيد الطلب
                  </button>
                )}

                {order.status === "Confirmé" && (
                  <button
                    onClick={() =>
                      updateStatus(order.id, "Livré")
                    }
                    className="w-full mt-4 bg-gold text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <PackageCheck size={19} />
                    تأكيد التسليم
                  </button>
                )}

              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}

export default Admin;