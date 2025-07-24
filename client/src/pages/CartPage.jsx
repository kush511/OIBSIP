import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContent';
import toast from 'react-hot-toast';




const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  console.log('Current cart:', cart);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: '#ef4444',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      // Place orders for each item in cart
      for (const item of cart) {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/pizza/order`, {
          pizzaType: item.type,
          pizzaRef: item.id,
          totalPrice: item.price * item.quantity,
          quantity: item.quantity
        }, {
          headers: { token }
        });
      }
      navigate("/my-orders")
      toast.success('🎉 Orders placed successfully!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#22c55e',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
      // Clear cart after successful order
      cart.forEach(item => removeFromCart(item.id));

    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.', {
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

      <div className="min-h-screen bg-gray-50 p-6">
        <span onClick={() => navigate("/")} className='cursor-pointer text-left text-gray-800 text-4xl font-medium bg-gray-50 rounded-xl justify-center items-center py-1 px-2'>
           ←
          <span className='text-3xl'>Back</span>
        </span>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">🛒 Your Cart</h1>

          {cart.length === 0 ? (
            <div className="text-center mt-20">
              <div className="bg-white rounded-lg shadow-lg p-12">
                <div className="text-6xl mb-6">🛒</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-600 mb-8">
                  Add some delicious pizzas to your cart to get started!
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Browse Menu
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="bg-white rounded-lg shadow-md">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="p-6 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-sm text-gray-600 capitalize">
                          {item.type === 'custom' ? 'Custom Pizza' : 'Menu Pizza'}
                        </p>

                        {/* Show custom pizza details */}
                        {item.details && (
                          <div className="mt-2 text-sm text-gray-500">
                            <p>Base: {item.details.base} | Sauce: {item.details.sauce} | Cheese: {item.details.cheese}</p>
                            {item.details.veggies && item.details.veggies.length > 0 && (
                              <p>Toppings: {item.details.veggies.join(', ')}</p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-800">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            ₹{item.price.toFixed(2)} each
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 font-medium cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Items ({cart.length})</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹49.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{(parseFloat(calculateTotal()) * 0.08).toFixed(2)}</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>₹{(parseFloat(calculateTotal()) + 49.99 + parseFloat(calculateTotal()) * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full cursor-pointer mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
