// New ../components/EditPizzaModal.jsx (for editing a pizza)
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const EditPizzaModal = ({ showEditModal, setShowEditModal, editingPizza, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    image: '',
    price: 0,
    base: '',
    sauce: '',
    cheese: '',
    veggies: [],
  });

  useEffect(() => {
    if (editingPizza) {
      setFormData({
        title: editingPizza.title || '',
        desc: editingPizza.desc || '',
        image: editingPizza.image || '',
        price: editingPizza.price || 0,
        base: editingPizza.base || '',
        sauce: editingPizza.sauce || '',
        cheese: editingPizza.cheese || '',
        veggies: editingPizza.veggies || [],
      });
    }
  }, [editingPizza]);

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
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/admin/pizza-update/${editingPizza._id}/public`,
        formData,
        { headers: { token } }
      );
      setShowEditModal(false);
      onSave(); // Refresh pizzas in parent
    } catch (error) {
      alert('Failed to update pizza: ' + error.message);
    }
  };

  if (!showEditModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Edit Pizza</h2>
        <input name="title" value={formData.title} onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
        <input name="desc" value={formData.desc} onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
        <input name="image" value={formData.image} onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
        <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
        <input name="base" value={formData.base} onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
        <input name="sauce" value={formData.sauce} onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
        <input name="cheese" value={formData.cheese} onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
        <input name="veggies" value={formData.veggies.join(', ')} onChange={handleVeggiesChange} className="w-full p-2 mb-4 border rounded" />
        <div className="flex justify-end gap-4">
          <button onClick={() => setShowEditModal(false)} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
          <button onClick={handleSubmit} className="bg-orange-500 text-white py-2 px-4 rounded">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditPizzaModal;
