import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !product.title ||
      !product.price ||
      !product.category ||
      !product.image
    ) {
      return toast.error("All fields are required");
    }
    dispatch(addProduct({ ...product, userId: user.id }));
    toast.success("Product is added is successfully");

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          className="w-full border p-2 rounded"
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
        />
        <input
          placeholder="Price"
          className="w-full border p-2 rounded"
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <input
          placeholder="Category"
          className="w-full border p-2 rounded"
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        />
        <input
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
        />
        <button className="w-full bg-purple-600 text-white py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
}
