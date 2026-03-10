import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-purple-600">
        Product Management
      </Link>
      <div className="flex gap-4 items-center">
        {user && <span className="font-bold">Welcome, {user.name}</span>}
        {user && <Link to="/" className="text-gray-700 hover:text-purple-600">Product-List</Link>}
        {user && <Link to="/product-form" className="text-gray-700 hover:text-purple-600">Add Product</Link>}
        {user ? (
          <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer">Logout</button>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-purple-600">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-purple-600">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}