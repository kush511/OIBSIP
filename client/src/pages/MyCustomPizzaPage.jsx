import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContent';
import toast from 'react-hot-toast';



const MyCustomPizzasPage = () => {
  const [customPizzas, setCustomPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyCustomPizzas = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/pizza/custom/mine`, {
          headers: { token }
        });
        
        // Assuming the response structure matches your backend
        setCustomPizzas(response.data.mypizzas || response.data || []);
      } catch (error) {
        console.error('Error fetching custom pizzas:', error);
        setError('Failed to load your custom pizzas. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyCustomPizzas();
  }, [navigate]);

  const calculatePrice = (pizza) => {
    // Base price for custom pizza
    const basePrice = 250;
    const toppingPrice = pizza.veggies ? pizza.veggies.length * 119.5 : 0;
    return (basePrice + toppingPrice).toFixed(2);
  };

  const handleAddToCart = (pizza) => {
    const price = calculatePrice(pizza);
    addToCart({
      id: pizza._id,
      type: 'custom',
      title: `Custom Pizza - ${pizza.base} Base`,
      price: parseFloat(price),
      quantity: 1,
      details: {
        base: pizza.base,
        sauce: pizza.sauce,
        cheese: pizza.cheese,
        veggies: pizza.veggies
      }
    });
    
    // Show success message using toast
    toast.success('🍕 Custom pizza added to cart!', {
      duration: 2000,
      position: 'top-center',
      style: {
        background: '#22c55e',
        color: '#fff',
        fontWeight: 'bold',
      },
    });
  };

  if (loading) {
    return (
      <>
       
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your custom pizzas...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
       
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto text-center mt-20">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-red-800 mb-4">Oops! Something went wrong</h2>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
     
      <div className="min-h-screen bg-gray-50 p-4 ">
        <span onClick={()=>navigate("/")} className='cursor-pointer text-left text-gray-800 text-4xl font-medium bg-gray-50 rounded-xl justify-center items-center py-1 px-2'> ← 
          <span className='text-3xl'>Back</span>
          </span>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🍕 My Custom Pizzas
            </h1>
            <p className="text-lg text-gray-600">
              Your personalized pizza creations are ready to order!
            </p>

          </div>

          {customPizzas.length === 0 ? (
            <div className="text-center mt-20">
              <div className="bg-white rounded-lg shadow-lg p-12">
                <div className="text-6xl mb-6">🍕</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  No Custom Pizzas Yet
                </h2>
                <p className="text-gray-600 mb-8">
                  You haven't created any custom pizzas yet. Start building your perfect pizza!
                </p>
                <button
                  onClick={() => navigate('/make-customPizza')}
                  className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Create Your First Custom Pizza
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  You have {customPizzas.length} custom pizza{customPizzas.length !== 1 ? 's' : ''}
                </p>
                <button
                  onClick={() => navigate('/make-customPizza')}
                  className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  + Create New Pizza
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {customPizzas.map((pizza, index) => (
                  <div
                    key={pizza._id || index}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
                  >
                    {/* Pizza Visual Representation */}
                    <div className="relative mb-4">
                      <div className="w-full h-40 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-md flex items-center justify-center text-4xl">
                        🍕
                      </div>
                      <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        Custom
                      </div>
                    </div>

                    {/* Pizza Details */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg text-gray-800">
                        Custom Pizza #{index + 1}
                      </h3>

                      <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium">Base:</span> {pizza.base || 'N/A'}</p>
                        <p><span className="font-medium">Sauce:</span> {pizza.sauce || 'N/A'}</p>
                        <p><span className="font-medium">Cheese:</span> {pizza.cheese || 'N/A'}</p>
                        
                        {pizza.veggies && pizza.veggies.length > 0 && (
                          <div>
                            <span className="font-medium">Toppings:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {pizza.veggies.map((veggie, idx) => (
                                <span
                                  key={idx}
                                  className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                                >
                                  {veggie}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-lg font-bold text-orange-600">
                            ₹{calculatePrice(pizza)}
                          </span>
                          <span className="text-sm text-gray-500">
                            Created {pizza.createdAt ? new Date(pizza.createdAt).toLocaleDateString() : 'Recently'}
                          </span>
                        </div>

                        <button
                          onClick={() => handleAddToCart(pizza)}
                          className="cursor-pointer w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded font-medium transition-colors duration-200"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCustomPizzasPage;
