// New ../components/AddPizzaModal.jsx (for adding a pizza)
import axios from 'axios';
import React, { useState } from 'react';

const AddPizzaModal = ({ showAddModal, setShowAddModal, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    image: '',
    price: 0,
    base: '',
    sauce: '',
    cheese: '',
    veggies: [], // Assume comma-separated string for simplicity; adjust if array
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const handleVeggiesChange = (e) => {
    setFormData((prev) => ({ ...prev, veggies: e.target.value.split(',').map((v) => v.trim()) }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/new-pizza`,
        formData,
        { headers: { token } }
      );
      setShowAddModal(false);
      onSave(); // Refresh pizzas in parent
    } catch (error) {
      alert('Failed to add pizza: ' + error.message);
    }
  };

  if (!showAddModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Add New Pizza</h2>
        <input name="title" placeholder="Title" onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
        <input name="desc" placeholder="Description" onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
        <input name="image" placeholder="Image URL" onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
        <input name="base" placeholder="Base" onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
        <input name="sauce" placeholder="Sauce" onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
        <input name="cheese" placeholder="Cheese" onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
        <input name="veggies" placeholder="Veggies (comma-separated)" onChange={handleVeggiesChange} className="w-full p-2 mb-4 border rounded" />
        <div className="flex justify-end gap-4">
          <button onClick={() => setShowAddModal(false)} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
          <button onClick={handleSubmit} className="bg-orange-500 text-white py-2 px-4 rounded">Add Pizza</button>
        </div>
      </div>
    </div>
  );
};

export default AddPizzaModal;
