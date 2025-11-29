export default function StudentCard ({ student, onToggle, onMark, onDelete }) {
  const { id, name, isDetailsVisible, status } = student;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-slate-800">{name}</h3>
          <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded mt-1 ${
            status === 'Present' ? 'bg-green-100 text-green-700' : 
            status === 'Absent' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'
          }`}>
            {status || "Not Marked"}
          </span>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => onToggle(id)}
            className="text-slate-500 hover:text-blue-600 text-sm underline cursor-pointer"
          >
            {isDetailsVisible ? "Hide Details" : "Show Details"}
          </button>
          
          <button 
            onClick={() => onDelete(id)}
            className="text-red-400 hover:text-red-600 p-1 cursor-pointer"
            title="Delete Student"
          >
            🗑️
          </button>
        </div>
      </div>

      {isDetailsVisible && (
        <div className="bg-slate-50 p-4 border-t border-slate-100">
          <p className="text-slate-600 text-sm mb-3">
            Manage attendance for <span className="font-semibold">{name}</span>:
          </p>
          <div className="flex gap-2">
            {/* Argument Passing: (id, customString) */}
            <button 
              onClick={() => onMark(id, "Present")}
              className={`flex-1 py-1.5 rounded text-sm font-medium border transition-colors cursor-pointer ${
                status === 'Present' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-600 border-slate-300 hover:bg-green-50'
              }`}
            >
              Mark Present
            </button>
            <button 
              onClick={() => onMark(id, "Absent")}
              className={`flex-1 py-1.5 rounded text-sm font-medium border transition-colors cursor-pointer ${
                status === 'Absent' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-600 border-slate-300 hover:bg-red-50'
              }`}
            >
              Mark Absent
            </button>
          </div>
        </div>
      )}
    </div>
  );
};