import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import InventoryManagement from "./pages/InventoryManagement/InventoryManagement";
import NotFoundPage from "./pages/NotFound/NotFound";
import HomePageLanding from "./pages/HomePageLanding/HomePageLanding";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<HomePage />} />
        <Route path="/" element={<HomePageLanding />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/inventory" element={<InventoryManagement />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
