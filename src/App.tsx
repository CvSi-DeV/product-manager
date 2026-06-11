import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={
        <Navigate to="/products" replace />
      } />
      <Route path="/login" element={
        <LoginPage />
      } />
      <Route path="/products" element={
        <ProtectedRoute>
          <ProductPage />
        </ProtectedRoute>
      } />
      <Route path="/cart" element={
        <ProtectedRoute>
          <CartPage />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/products" replace />} />

    </Routes>
  );
}

export default App;