import React from 'react';

const FeedbackCard = ({ feedback }) => {
  const borderColor = {
    High: 'border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.2)]',
    Medium: 'border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.2)]',
    Low: 'border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
  };

  const badgeColor = {
    High: 'text-pink-400 bg-pink-400/10',
    Medium: 'text-purple-400 bg-purple-400/10',
    Low: 'text-cyan-400 bg-cyan-400/10'
  };

  return (
    <div className={`bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl p-6 border ${borderColor[feedback.priority]} hover:bg-gray-800 transition-all duration-300 flex flex-col relative overflow-hidden group`}>
      <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col">
                <h3 className="text-lg font-bold text-gray-100">{feedback.fullName}</h3>
                <span className="text-xs text-gray-500">{feedback.email}</span>
            </div>
            <span className={`px-2 py-1 rounded text-[10px] font-mono uppercase tracking-widest border border-current ${badgeColor[feedback.priority]}`}>
                {feedback.priority}
            </span>
        </div>

        <div className="mb-4">
            <div className="text-xs text-gray-400 font-mono mb-2 uppercase tracking-wide border-b border-gray-700 pb-1">Log Content</div>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{feedback.description}</p>
        </div>

        {feedback.steps.filter(s => s).length > 0 && (
            <div className="mb-4 bg-gray-900/50 p-3 rounded border border-gray-700">
                <div className="text-[10px] text-cyan-500 font-bold uppercase mb-2">Steps to Reproduce</div>
                <ul className="list-decimal list-inside text-xs text-gray-400 font-mono">
                    {feedback.steps.map((step, idx) => step && <li key={idx}>{step}</li>)}
                </ul>
            </div>
        )}

        {feedback.suggestions.filter(s => s).length > 0 && (
            <div className="mb-4 bg-gray-900/50 p-3 rounded border border-gray-700">
                <div className="text-[10px] text-cyan-500 font-bold uppercase mb-2">Suggestion</div>
                <ul className="list-decimal list-inside text-xs text-gray-400 font-mono">
                    {feedback.suggestions.map((suggestion, idx) => suggestion && <li key={idx}>{suggestion}</li>)}
                </ul>
            </div>
        )}

        {feedback.additionalNotes && (
           <div className="mb-4 text-xs font-mono text-yellow-500 bg-yellow-900/10 p-2 border border-yellow-900/30 rounded">
             <span className="font-bold opacity-70">NOTE:</span> {feedback.additionalNotes}
           </div>
        )}

        <div className="mt-auto flex justify-between items-end pt-4 border-t border-gray-700">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 font-mono">{feedback.timestamp}</span>
              <span className="text-[10px] text-gray-600 font-mono uppercase">{feedback.category}</span>
            </div>

            {feedback.screenshotUrl && (
              <a 
                href={feedback.screenshotUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors border border-cyan-500/30 px-3 py-1.5 rounded hover:bg-cyan-500/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                VIEW PROOF
              </a>
            )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;