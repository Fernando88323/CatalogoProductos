import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-10 bg-blue-600 text-white p-4">
      <Link to="/" className="font-bold text-xl">
        Catálogo
      </Link>
      <Link to="/admin/login" className="ml-4">
        Admin
      </Link>
    </nav>
  );
}
export default Navbar;
