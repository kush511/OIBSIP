import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentModal from '../components/PaymentModal'; 

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/pizza/orders/mine`, {
          headers: { token }
        });
        setOrders(response.data.orderByUser || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [navigate]);

  const handlePaymentClick = (order) => {
    setSelectedOrder(order);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    // Refresh orders after successful payment
    setShowPaymentModal(false);
    setSelectedOrder(null);
    // Refetch orders to show updated status
    window.location.reload();
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
      case 'not started':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
      case 'working':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPizzaTitle = (order) => {
    if (order.pizzaType === 'custom' && order.pizzaRef) {
      const { base, cheese } = order.pizzaRef;
      return `${base || 'Regular'} + ${cheese || 'Mozzarella'}`;
    }
    return order.pizzaRef?.title || 'Standard Pizza';
  };

  const getPizzaImage = (order) => {
    if (order.pizzaType === 'custom') {
      return '🍕';
    }
    return order.pizzaRef?.image || 'https://via.placeholder.com/150x150?text=Pizza';
  };

  return (
    <>
      {/* Payment Modal */}
      <PaymentModal
        showPaymentModal={showPaymentModal}
        setShowPaymentModal={setShowPaymentModal}
        selectedOrder={selectedOrder}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="flex justify-between items-center bg-white rounded-lg shadow-sm p-8 mb-8 ">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
              📋 My Orders
            </h1>
            <p className="text-lg text-gray-600">
              Track your delicious pizza orders
            </p>
            </div>
           <span onClick={()=>navigate("/")}
            className='mr-6 px-4 py-2 rounded-md bg-gradient-to-l from-orange-400  to-red-400 cursor-pointer'> 
            Dashboard
            </span>
          </div>
          

          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center mt-20">
              <div className="bg-white rounded-lg shadow-lg p-12">
                <div className="text-6xl mb-6">📋</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
                <p className="text-gray-600 mb-8">
                  You haven't placed any orders yet. Start by browsing our menu!
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Browse Menu
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Pizza Image/Emoji */}
                    <div className="flex-shrink-0">
                      {order.pizzaType === 'custom' ? (
                        <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-lg flex items-center justify-center text-4xl">
                          🍕
                        </div>
                      ) : (
                        <img
                          src={getPizzaImage(order)}
                          alt="Pizza"
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      )}
                    </div>

                    {/* Order Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {formatPizzaTitle(order)}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Order #{order._id.slice(-6)} • {new Date(order.createdAt).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="capitalize">{order.pizzaType}</span> Pizza • Quantity: {order.quantity}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">₹{order.totalPrice}</p>
                        </div>
                      </div>

                      {/* Custom Pizza Details */}
                      {order.pizzaType === 'custom' && order.pizzaRef && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-gray-700 mb-2">Pizza Details:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-600">Base:</span>
                              <p className="text-gray-800">{order.pizzaRef.base}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Sauce:</span>
                              <p className="text-gray-800">{order.pizzaRef.sauce}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Cheese:</span>
                              <p className="text-gray-800">{order.pizzaRef.cheese}</p>
                            </div>
                          </div>
                          {order.pizzaRef.veggies && order.pizzaRef.veggies.length > 0 && (
                            <div className="mt-3">
                              <span className="font-medium text-gray-600">Toppings:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {order.pizzaRef.veggies.map((veggie, idx) => (
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
                      )}

                      {/* Status Badges and Payment Button */}
                      <div className="flex flex-wrap gap-3 items-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          Order: {order.status || 'Pending'}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                          Payment: {order.paymentStatus || 'Pending'}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {order.pizzaModelType === 'custompizzas' ? 'Custom' : 'Standard'}
                        </span>
                        
                        {/* Pay Online Button - Only show if payment is pending */}
                        {order.paymentStatus !== 'success' && (
                          <button
                            onClick={() => handlePaymentClick(order)}
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            💳 Pay Online
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;
