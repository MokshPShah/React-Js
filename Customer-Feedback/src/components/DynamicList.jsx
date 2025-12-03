import React from 'react';

const DynamicList = ({ label, items, onItemChange, onAddItem, onRemoveItem, placeholder, inputBase, labelStyle }) => {
  return (
    <div>
      <label className={labelStyle}>{label}</label>
      <div className="space-y-3">
        {items.map((item, index) => (
            <div key={index} className="flex gap-3">
            <span className="text-gray-600 font-mono pt-3">0{index + 1}</span>
            <input type="text" value={item} onChange={(e) => onItemChange(index, e.target.value)} placeholder={placeholder} className={inputBase} />
            {items.length > 1 && (
                <button type="button" onClick={() => onRemoveItem(index)} className="text-gray-600 hover:text-pink-500 transition-colors px-2">✕</button>
            )}
            </div>
        ))}
      </div>
      <button type="button" onClick={onAddItem} className="mt-3 text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-widest border-b border-dashed border-cyan-800 hover:border-cyan-400 pb-1">
        + Add More
      </button>
    </div>
  );
};

export default DynamicList;