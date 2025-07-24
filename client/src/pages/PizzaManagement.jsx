// New PizzaManagement.jsx (create this file for the /admin/public-pizza route)
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddPizzaModal from '../components/addPizzaModel';
import EditPizzaModal from '../components/EditPizzaModel';
import { useNavigate } from 'react-router-dom';


const PizzaManagement = () => {
  const [pizzas, setPizzas] = useState([]); // State for all menu pizzas
  const [showAddModal, setShowAddModal] = useState(false); // For add modal
  const [showEditModal, setShowEditModal] = useState(false); // For edit modal
  const [editingPizza, setEditingPizza] = useState(null); // Pizza being edited

  const navigate = useNavigate()
  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/pizza`, {
        headers: { token: token }, // Assuming token is needed; adjust if public
      });
      setPizzas(response.data.pizzas);
    } catch (error) {
      console.error('Failed to fetch pizzas:', error);
    }
  };

  // Handle opening edit modal
  const handleEdit = (pizza) => {
    setEditingPizza(pizza);
    setShowEditModal(true);
  };

  // Handle delete pizza
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pizza?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/admin/pizza/delete/${id}`, {
        headers: { token: token },
      });
      fetchPizzas(); // Refresh pizzas
    } catch (error) {
      alert('Failed to delete pizza: ' + error.message);
    }
  };

  // Callback after add/edit to refresh pizzas
  const handleRefresh = () => {
    fetchPizzas();
  };

  return (
    <>
      {/* Add Modal */}
      <AddPizzaModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        onSave={handleRefresh}
      />

      {/* Edit Modal */}
      <EditPizzaModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        editingPizza={editingPizza}
        onSave={handleRefresh}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
        <span onClick={() => navigate("/admin/dashboard")}
                    className='mr-6 px-4 py-2 rounded-md bg-gray-300 cursor-pointer '>
                    Dashboard
                </span>
        <div className="bg-white rounded-lg shadow-sm p-8 my-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Pizza Management</h1>
              <p className="text-lg text-gray-600">Add, edit, and manage your pizza menu</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer duration-200 flex items-center gap-2"
            >
              <span className="text-lg ">+</span> Add Pizza
            </button>
          </div>
        </div>

        {/* Pizza List */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pizzas.map((pizza) => (
              <div key={pizza._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                <img src={pizza.image} alt={pizza.title} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="font-bold text-lg text-gray-800 mb-2">{pizza.title}</h3>
                <p className="text-gray-600 mb-2">{pizza.desc}</p>
                <p className="font-medium text-orange-600 mb-4"> Rs.{pizza.price}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Base: {pizza.base} | Sauce: {pizza.sauce} | Cheese: {pizza.cheese} | Veggies: {pizza.veggies?.join(', ')}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(pizza)}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 cursor-pointer rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pizza._id)}
                    className="flex-1 bg-red-500 text-white py-2 px-4 cursor-pointer rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PizzaManagement;
