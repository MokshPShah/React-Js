import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!form.email || !form.password) {
        toast.error("All Fields are required");
      }
      await dispatch(loginUser(form)).unwrap();
      toast.success("Login Successfully! redirecting to home page...");

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-lg rounded-lg w-80"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          disabled={loading}
          className={`w-full py-2 rounded text-white transition-colors ${
            loading
              ? "bg-purple-300 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="text-sm mt-4 text-center text-gray-600">
          Don't have an account?
          <Link to="/register" className="text-purple-600 hover:underline ml-1">
            Register
          </Link>
        </p>

        {error && (
          <div className="mt-4 p-2 bg-red-100 border border-red-400 rounded">
            <p className="text-red-700 text-xs text-center font-medium">
              {error}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
