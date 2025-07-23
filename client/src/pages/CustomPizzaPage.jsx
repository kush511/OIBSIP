import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CustomPizzaPage = () => {
  const [formData, setFormData] = useState({
    base: '',
    sauce: '',
    cheese: '',
    veggies: []
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVeggiesChange = (veggie, isChecked) => {
    setFormData(prev => ({
      ...prev,
      veggies: isChecked 
        ? [...prev.veggies, veggie]
        : prev.veggies.filter(v => v !== veggie)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/pizza/custom-pizza`, formData, {
        headers: { token }
      });
      navigate('/customPizzas/mine');
    } catch (error) {
      console.error('Error creating custom pizza:', error);
      alert('Failed to create custom pizza. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            🍕 Build Your Custom Pizza
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Base Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Choose Your Base
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Thin Crust', 'Cheese Burst', 'Whole Wheat'].map(base => (
                  <label key={base} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="base"
                      value={base}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="text-gray-700">{base}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sauce Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Choose Your Sauce
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Tomato Sauce', 'Pesto', 'White Garlic Sauce'].map(sauce => (
                  <label key={sauce} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sauce"
                      value={sauce}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="text-gray-700">{sauce}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cheese Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Choose Your Cheese
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Mozzarella', 'Cheddar', 'Parmesan'].map(cheese => (
                  <label key={cheese} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="cheese"
                      value={cheese}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="text-gray-700">{cheese}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Veggies Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Choose Your Toppings
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Mushrooms', 'Jalapenos', 'Onion', 'Capsicum', 'Olive'].map(veggie => (
                  <label key={veggie} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      onChange={(e) => handleVeggiesChange(veggie, e.target.checked)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="text-gray-700">{veggie}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              {loading ? 'Creating Pizza...' : 'Create Custom Pizza'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomPizzaPage;
