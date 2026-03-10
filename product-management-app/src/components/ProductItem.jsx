import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/productSlice";
import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(product.id));
        }
    };

    return (
        <div className="border p-4 rounded shadow bg-white flex flex-col h-full">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="font-bold text-lg">{product.title}</h3>
            <p className="text-gray-600 mb-1">${product.price}</p>
            <p className="text-sm text-purple-600 mb-4 flex-grow">{product.category}</p>

            <div className="flex gap-2 mt-auto">
                <Link to={`/edit-product/${product.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex-1 text-center transition-colors">Edit</Link>
                <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex-1 transition-colors cursor-pointer">Delete</button>
            </div>
        </div>
    );
}