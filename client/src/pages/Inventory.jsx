import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal'; // Original add modal (update with improvements if needed)
import EditModal from '../components/EditModal'; // New edit modal (update with improvements below)

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false); // For add modal
  const [showEditModal, setShowEditModal] = useState(false); // For edit modal
  const [lessQuantityItemName, setLessQuantityItemName] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // New: For search functionality

  useEffect(() => {
    fetchItems();
    checkInventoryForThreshold();
  }, []);

  async function fetchItems() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/inventory`, {
        headers: { token: token },
      });
      setItems(response.data.allItems);
    } catch (error) {
      alert(error);
    }
  }

  async function checkInventoryForThreshold() {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/check-inventory`, {
      headers: { token: token },
    });
    const { lowStockItems } = response.data;
    setLessQuantityItemName(lowStockItems.map(i => i.name));
  }

  // Handle opening edit modal
  const handleEdit = (item) => {
    console.log(item, item._id); // Updated: Log item and its _id
    setEditingItem(item);
    setShowEditModal(true);
  };

  // Callback after save to refresh
  const handleSave = () => {
    setShowEditModal(false);
    setEditingItem(null);
    fetchItems();
    checkInventoryForThreshold();
  };

  // Filter items based on search query
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Original add modal */}
      <Modal showModal={showModal} setShowModal={setShowModal} />

      {/* New edit modal */}
      <EditModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        editingItem={editingItem}
        onSave={handleSave}
      />

      <div className="min-h-screen bg-gray-50 p-6">
        {/* Clean Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Inventory Management
              </h1>
              <p className="text-lg text-gray-600">
                Track and manage your pizza ingredients
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <span className="text-lg">+</span> Add Item
            </button>
          </div>
        </div>

        {/* New: Search Bar */}
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-xl mx-auto p-3 mb-6 border rounded-lg focus:outline-none focus:border-orange-500 shadow-sm"
        />

        {/* Inventory Content */}
        <div className="max-w-7xl mx-auto">
          {['Veggie', 'Cheese', 'Base', 'Sauce'].map(category => (
            <div key={category} className="mb-10">
              {/* Simple Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 capitalize">
                  {category}
                </h2>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  {filteredItems.filter(item => item.category === category).length} items
                </span>
              </div>

              {/* Clean Item Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {filteredItems
                  .filter(item => item.category === category)
                  .map(item => (
                    <div 
                      key={item._id} 
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    >
                      {/* Item Name */}
                      <h3 className="font-bold text-lg text-gray-800 mb-4">{item.name}</h3>

                      {/* Stock Info - Clean Layout */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Current Stock:</span>
                          <span className={`font-bold text-lg ${item.quantity < item.threshold ? 'text-red-600' : 'text-gray-800'}`}>
                            {item.quantity}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Alert Level:</span>
                          <span className="font-medium text-gray-700">{item.threshold}</span>
                        </div>

                        {/* Simple Status Badge */}
                        <div className="pt-3 border-gray-100">
                          {lessQuantityItemName.includes(item.name) ? (
                            <span className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium animate-pulse">
                              ⚠️ Low Stock - Reorder Soon!
                            </span>
                          ) : (
                            <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                              ✅ In Stock
                            </span>
                          )}
                        </div>
                        <hr className='text-gray-200'/>
                        <div className='flex gap-3 pt-4 text-white'>
                          <button 
                            onClick={() => handleEdit(item)}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white cursor-pointer px-8 py-2 rounded-md transition-colors duration-200"
                            title="Edit this item's name and quantity"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Inventory;
