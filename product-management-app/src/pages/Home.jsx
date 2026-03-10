import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import ProductItem from "../components/ProductItem";

export default function Home() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector(state => state.products);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => { 
        dispatch(fetchProducts()); 
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!items || items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-20">
                <h2 className="text-2xl font-bold text-gray-700">No products found</h2>
                <p className="text-gray-500 mt-2">Try adding some products to your account.</p>
            </div>
        );
    }

    let filtered = items.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    
    if (category) filtered = filtered.filter(p => p.category === category);
    if (sort === "low") filtered = [...filtered].sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "high") filtered = [...filtered].sort((a, b) => Number(b.price) - Number(a.price));

    const categories = [...new Set(items.map(p => p.category))];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                {/* Search Bar */}
                <div className="relative w-full md:w-1/2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input 
                        type="text"
                        placeholder="Search products..." 
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        onChange={e => setSearch(e.target.value)} 
                    />
                </div>

                {/* Filters */}
                <div className="flex w-full md:w-auto gap-3">
                    <select 
                        className="flex-1 md:w-40 border border-gray-300 bg-white py-2 px-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer" 
                        onChange={e => setSort(e.target.value)}
                    >
                        <option value="">Sort by Price</option>
                        <option value="low">Low to High</option>
                        <option value="high">High to Low</option>
                    </select>

                    <select 
                        className="flex-1 md:w-48 border border-gray-300 bg-white py-2 px-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer" 
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>
            
            {filtered.length === 0 ? (
                <div className="text-center mt-16 text-gray-500 bg-gray-50 py-10 rounded-xl border border-dashed border-gray-300">
                    <p className="text-lg font-medium">No products match your search or filters.</p>
                    <button 
                        onClick={() => {setSearch(''); setCategory(''); setSort('');}} 
                        className="mt-4 text-blue-500 hover:text-blue-700 font-medium"
                    >
                        Clear filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map(product => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}