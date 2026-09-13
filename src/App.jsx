import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Catalogue from "./pages/Catalogue";
import Cart from "./pages/Cart";
import Confirmation from "./pages/Confirmation";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <Catalogue
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/confirmation"
          element={<Confirmation />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;