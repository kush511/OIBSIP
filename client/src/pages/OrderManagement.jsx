
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const OrderManagement = () => {
    const [orders, setOrders] = useState([])
  
    useEffect(() => {
        fetchOrders()
    }, [])

    async function fetchOrders() {
        try {
            const token = localStorage.getItem('token')

            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/all-orders`, {
                headers: {
                    token: token
                }
            })
            setOrders(response.data.allOrders)
        } catch (error) {
                console.log(error);
                
        }
    }

   async function changeStatus(orderId, currentStatus) {
    console.log("Changing status from:", currentStatus);
    
    // Define the next status based on current status
    const nextStatus = {
        'Not started': 'working',
        'working': 'completed',
        'completed': 'Not started'
    };
    
    const newStatus = nextStatus[currentStatus];
    
    try {
        const token = localStorage.getItem('token');
        
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/admin/orders/${orderId}/status`, {
            status: newStatus 
        }, {
            headers: { token: token }
        });
        
        fetchOrders(); 
        
    } catch (error) {
        console.error("Failed to update status:", error);
        alert("Failed to update order status");
    }
}



    return (
        <>
            <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 '>
                <div className='text-center mb-8'>
                    <h1 className='text-4xl text-gray-800 font-bold'>All the Orders in one place</h1>
                    <p className='text-lg text-gray-600 font-medium'>Work faster with a single orderPlace</p>
                </div>

                {/* Updated Table Headings */}
                <div className='grid grid-cols-7 bg-orange-500 text-white/90 font-semibold py-3 px-4 rounded-t text-sm'>
                    <div>Order ID</div>
                    <div>Customer</div>
                    <div>Pizza Details</div>
                    <div>Type</div>
                    <div>Status</div>
                    <div>Payment</div>
                    <div>Amount</div>
                </div>

                {/* Updated Order Rows */}
                {orders.map(order => (
                    <div className='grid grid-cols-7 bg-white border-b hover:bg-gray-50 py-3 px-4 text-sm' key={order._id}>
                        <div className="font-mono text-xs">{order._id.slice(-8)}</div>
                        <div>
                            <div className="font-medium">{order.userId.username}</div>
                            <div className="text-gray-500 text-xs">{order.userId.email}</div>
                        </div>
                        <div>
                            {order.pizzaType === 'standard' ? (
                                <div>
                                    <div className="font-medium">{order.pizzaRef.title}</div>
                                    <div className="text-gray-500 text-xs">₹{order.pizzaRef.price}</div>
                                </div>
                            ) : (
                                <div>
                                    <div className="font-medium">Custom Pizza</div>
                                    <div className="text-gray-500 text-xs">{order.pizzaRef.base} + {order.pizzaRef.cheese}</div>
                                </div>
                            )}
                        </div>
                        <div className="capitalize">{order.pizzaType}</div>
                        <div>
                            <button
                                onClick={() => changeStatus(order._id, order.status)}
                                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${order.status === 'completed' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                        order.status === 'working' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                                            'bg-red-100 text-red-800 hover:bg-red-200'
                                    }`}
                            >
                                {order.status}
                            </button>
                        </div>
                        <div className={`font-medium ${order.paymentStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {order.paymentStatus}
                        </div>
                        <div className="font-bold">₹{order.totalPrice}</div>
                    </div>
                ))}

            </div>
        </>
    )
}

export default OrderManagement