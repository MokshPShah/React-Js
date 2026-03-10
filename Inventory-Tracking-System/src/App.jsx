import React, { useState } from 'react';
import { useInventorySync } from './hooks/useInventorySync';
import InventoryTable from './components/InventoryTable';
import ProductForm from './components/ProductForm';
import Modal from './components/Modal';

const App = () => {
  useInventorySync();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddClick = () => {
    setEditingProduct(null); 
    setIsModalOpen(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product); 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null); 
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory Dashboard</h1>
            <p className="text-gray-500 mt-1">Real-time stock management</p>
          </div>
          <button 
            onClick={handleAddClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow transition-colors cursor-pointer"
          >
            + Add Product
          </button>
        </header>

        <main>
          <InventoryTable onEdit={handleEditClick} />
        </main>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ProductForm 
          existingProduct={editingProduct} 
          onClose={handleCloseModal} 
        />
      </Modal>
    </div>
  );
};

export default App;