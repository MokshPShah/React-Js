import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/70 bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative z-10 w-full max-w-md mx-4">
        {children}
      </div>
    </div>
  );
};

export default Modal;