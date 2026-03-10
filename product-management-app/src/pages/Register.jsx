import { use, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!user.email || !user.name || !user.password) {
      toast.error("All Fields are required");
    }

    dispatch(registerUser(user));
    toast.success("User is registered successfully");

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer/>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow rounded w-80"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <input
          placeholder="Name"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          placeholder="Email"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="w-full bg-purple-600 text-white py-2 rounded">
          Register
        </button>
        <p className="text-sm mt-4 text-center">
          Already have account?{" "}
          <Link to="/login" className="text-purple-600 ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
