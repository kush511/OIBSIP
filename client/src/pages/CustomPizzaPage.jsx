import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


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
      toast.error('Failed to create custom pizza. Please try again.', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#ef4444',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4 sm:px-6">
       <div onClick={()=>navigate("/")} className='cursor-pointer text-3xl fixed top-5 font-bold text-gray-800'>Pizzeria</div>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-orange-500 py-6">
            <h1 className="text-4xl font-extrabold text-white text-center tracking-wide">
               Build By Your Choice
            </h1>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Base Selection */}
            <div className="bg-gray-50 rounded-xl p-6 transition-all duration-200 hover:shadow-md">
              <label className="block text-xl font-bold text-orange-700 mb-4">
                1. Choose Your Base
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Thin Crust', 'Cheese Burst', 'Whole Wheat','Gluten Free Crust','Crunchy Thin Crust'].map(base => (
                  <label key={base} className="flex items-center p-3 bg-white rounded-lg cursor-pointer hover:bg-orange-100 transition-colors duration-200">
                    <input
                    
                      type="radio"
                      name="base"
                      value={base}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-orange-500 border-orange-300 focus:ring-orange-500"
                    />
                    <span className="ml-3 text-gray-800 font-medium">{base}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sauce Selection */}
            <div className="bg-gray-50 rounded-xl p-6 transition-all duration-200 hover:shadow-md">
              <label className="block text-xl font-bold text-orange-700 mb-4">
                2. Select Your Sauce
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Tomato Sauce', 'Pesto', 'White Garlic Sauce','BBQ Pizza Sauce','Hot Wing Sauce'].map(sauce => (
                  <label key={sauce} className="flex items-center p-3 bg-white rounded-lg cursor-pointer hover:bg-orange-100 transition-colors duration-200">
                    <input
                    
                      type="radio"
                      name="sauce"
                      value={sauce}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-orange-500 border-orange-300 focus:ring-orange-500"
                    />
                    <span className="ml-3 text-gray-800 font-medium">{sauce}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cheese Selection */}
            <div className="bg-gray-50 rounded-xl p-6 transition-all duration-200 hover:shadow-md">
              <label className="block text-xl font-bold text-orange-700 mb-4">
                3. Pick Your Cheese
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Mozzarella', 'Cheddar', 'Parmesan','Swiss Cheese','Feta'].map(cheese => (
                  <label key={cheese} className="flex items-center p-3 bg-white rounded-lg cursor-pointer hover:bg-orange-100 transition-colors duration-200">
                    <input
                    
                      type="radio"
                      name="cheese"
                      value={cheese}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-orange-500 border-orange-300 focus:ring-orange-500"
                    />
                    <span className="ml-3 text-gray-800 font-medium">{cheese}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Veggies Selection */}
            <div className="bg-gray-50 rounded-xl p-6 transition-all duration-200 hover:shadow-md">
              <label className="block text-xl font-bold text-orange-700 mb-4">
                4. Add Your Toppings
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Mushrooms', 'Jalapenos', 'Onion', 'Capsicum', 'Olive','PineApple'].map(veggie => (
                  <label key={veggie} className="flex items-center p-3 bg-white rounded-lg cursor-pointer hover:bg-orange-100 transition-colors duration-200">
                    <input
                    
                      type="checkbox"
                      onChange={(e) => handleVeggiesChange(veggie, e.target.checked)}
                      className="w-5 h-5 text-orange-500 border-orange-300 focus:ring-orange-500"
                    />
                    <span className="ml-3 text-gray-800 font-medium">{veggie}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 cursor-pointer text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
            >
              {loading ? '🔄 Creating Your Masterpiece...' : '🎨 Create Your Custom Pizza'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomPizzaPage;
