import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../redux/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !product.title ||
      !product.price ||
      !product.category ||
      !product.image
    ) {
      return toast.error("All fields are required");
    }
    await dispatch(updateProduct(product));

    toast.success("Product updated successfully!");

    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
        />
        <input
          placeholder="Price"
          className="w-full border p-2 rounded"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <input
          placeholder="Category"
          className="w-full border p-2 rounded"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        />
        <input
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
