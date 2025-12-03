import React from 'react';
import FeedbackCard from './FeedbackCard';

const FeedbackList = ({ feedbacks }) => {
  return (
    <div className="mt-20">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">System Logs</h2>
        <div className="h-px flex-grow bg-gradient-to-r from-gray-700 to-transparent"></div>
        <span className="text-cyan-400 font-mono text-sm border border-cyan-900 bg-cyan-900/20 px-3 py-1 rounded">
            COUNT: {feedbacks.length}
        </span>
      </div>

      {feedbacks.length === 0 ? (
        <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-12 text-center">
            <div className="text-gray-600 text-4xl mb-4 animate-pulse">●</div>
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">No Anomalies Detected</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((item) => (
            <FeedbackCard key={item.id} feedback={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;