import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ProductDetail2 from "./pages/ProductDetail/ProductDetail2";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import InventoryManagement from "./pages/InventoryManagement/InventoryManagement";
import Contacto from "./pages/Contacto/contacto";
import NotFoundPage from "./pages/NotFound/notFound";
import HomePage2 from "./pages/HomePage2/HomePage2";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<HomePage2 />} />
        {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
        <Route path="/product/:id" element={<ProductDetail2 />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/inventory" element={<InventoryManagement />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
