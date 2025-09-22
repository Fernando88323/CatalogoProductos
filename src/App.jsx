import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/homePage";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Contacto from "./pages/Contacto/contacto";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Router>
  );
};

export default App;
