
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const EditModal = ({ showEditModal, setShowEditModal, editingItem, onSave }) => {
  const [formData, setFormData] = useState({ name: '', quantity: 0 });

  // Pre-fill form with editingItem data
  useEffect(() => {
 
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        quantity: editingItem.quantity,
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'quantity' ? Number(value) : value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || formData.quantity < 0) {
      alert('Please enter a valid name and non-negative quantity.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log(editingItem);
      
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/admin/update/manual/${editingItem._id}`,
        { name: formData.name, quantity: formData.quantity },
        { headers: { token } }
      );
      onSave(); // Refresh parent
    } catch (error) {
      alert('Failed to update item: ' + error.message);
    }
  };

  const handleClose = () => {
    setShowEditModal(false);
  };

  if (!showEditModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Edit Item</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            autoComplete={"off"}
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            min="0"
            required
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleClose}
            className="bg-gray-500 cursor-pointer text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-orange-500 cursor-pointer text-white py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
