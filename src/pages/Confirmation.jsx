import { CheckCircle, ShoppingBag, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Confirmation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9F7] flex items-center justify-center px-4">

      <main className="w-full max-w-lg">

        <div className="bg-white rounded-3xl shadow-sm p-6 text-center">

          {/* Success icon */}
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-primary-pale flex items-center justify-center">
              <CheckCircle
                size={48}
                className="text-primary"
              />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-2xl font-bold text-primary">
            تم استلام طلبك!
          </h1>

          <p className="text-gray-500 mt-3 leading-7">
            شكراً لثقتك في NORVEST 🌱
            <br />
            سيتم التواصل معك لتأكيد الطلب.
          </p>

          {/* Demo delivery info */}
          <div className="mt-5 bg-primary-pale rounded-2xl p-4">
            <p className="text-sm text-primary font-medium">
              🚚 موعد التسليم
            </p>

            <p className="text-gray-700 font-bold mt-1">
              حسب الموعد المتفق عليه
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3 mt-6">

            <button
              onClick={() => navigate("/orders")}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <ClipboardList size={20} />
              متابعة طلباتي
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-gray-100 text-gray-700 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              العودة للمنتجات
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Confirmation;