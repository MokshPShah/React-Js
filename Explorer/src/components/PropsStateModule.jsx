import React, { useState } from 'react';

const ChildComponent = ({ count, onReset }) => {
  return (
    <div className='mt-4 p-4 border border-indigo-100 bg-indigo-50 rounded-lg'>
      <p className='text-sm text-indigo-600 font-medium mb-2'>
        Child Component (Props Receiver)
      </p>
      <div className='flex justify-between items-center'>
        <span className='text-2xl font-bold text-indigo-900'>
          Prop Value: {count}
        </span>
        <button
          onClick={() => {
            console.log('🖱️ Interaction: Reset clicked in Child');
            onReset();
          }}
          className='text-xs bg-indigo-200 hover:bg-indigo-300 text-indigo-800 px-3 py-1 rounded transition-colors cursor-pointer'
        >
          Reset via Prop
        </button>
      </div>
    </div>
  );
};

export default function PropsStateModule () {
  const [count, setCount] = useState(0);
  const [isToggled, setIsToggled] = useState(false);

  const handleIncrement = () => {
    console.log(`🖱️ Interaction: Counter Increment. New Value: ${count + 1}`);
    setCount((c) => c + 1);
  };

  const handleDecrement = () => {
    console.log(`🖱️ Interaction: Counter Decrement. New Value: ${count - 1}`);
    setCount((c) => c - 1);
  };

  const handleToggle = () => {
    console.log(`🖱️ Interaction: Toggle switched to ${!isToggled}`);
    setIsToggled(!isToggled);
  };

  return (
    <div className='p-6 bg-white rounded-xl shadow-sm border border-slate-200'>
      <div className='grid md:grid-cols-2 gap-6'>
        <div>
          <p className='mb-2 font-medium text-slate-700'>Counter State</p>
          <div className='flex gap-2'>
            <button
              onClick={handleDecrement}
              className='px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold cursor-pointer'
            >
              -
            </button>
            <span className='px-4 py-2 bg-slate-800 text-white rounded-lg min-w-12 text-center'>
              {count}
            </span>
            <button
              onClick={handleIncrement}
              className='px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold cursor-pointer'
            >
              +
            </button>
          </div>
        </div>
        <div>
          <p className='mb-2 font-medium text-slate-700'>
            Boolean Toggle State
          </p>
          <button
            onClick={handleToggle}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
              isToggled
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            {isToggled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <ChildComponent count={count} onReset={() => setCount(0)} />
    </div>
  );
};

