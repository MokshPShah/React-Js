import { Fragment, useRef, useState } from "react";

export default function StudentForm ({ onAdd }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError(true);
      inputRef.current.focus();
      return;
    }

    onAdd(name);
    setName("");
    setError(false);
    inputRef.current.focus(); 
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Add New Student</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Fragment>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter student name..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if(error) setError(false);
              }}
              className={`flex-1 p-3 border rounded-lg outline-none transition-all ${
                error ? "border-red-500 bg-red-50" : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }`}
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Add
            </button>
          </div>
          {error && <p className="text-red-500 text-sm font-medium mt-1"><span className="font-bold">Warning:</span> Name cannot be empty.</p>}
        </Fragment>
      </form>
    </div>
  );
};