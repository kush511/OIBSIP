
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const OrderManagement = () => {

    const [orders, setOrders] = useState([])
    const navigate = useNavigate()
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
            <div className='min-h-screen bg-gradient-to-br from-orange-50 to-white p-8'>
                <span onClick={() => navigate("/admin/dashboard")}
                    className='mr-6 px-4 py-2 rounded-md bg-gray-200 cursor-pointer'>
                    Dashboard
                </span>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center mb-10'>
                        <h1 className='text-4xl text-gray-800 font-extrabold mb-2'>Order Management Dashboard</h1>
                        <p className='text-lg text-gray-600'>Manage and track all pizza orders in real-time</p>
                    </div>

                    <div className='bg-white rounded-xl shadow-xl overflow-hidden'>
                        {/* Stats Overview */}
                        <div className='grid grid-cols-4 gap-4 p-6 bg-gradient-to-r from-orange-500 to-orange-600'>
                            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white'>
                                <div className='text-sm opacity-80'>Total Orders</div>
                                <div className='text-2xl font-bold'>{orders.length}</div>
                            </div>
                            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white'>
                                <div className='text-sm opacity-80'>Pending</div>
                                <div className='text-2xl font-bold'>{orders.filter(o => o.status === 'Not started').length}</div>
                            </div>
                            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white'>
                                <div className='text-sm opacity-80'>In Progress</div>
                                <div className='text-2xl font-bold'>{orders.filter(o => o.status === 'working').length}</div>
                            </div>
                            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white'>
                                <div className='text-sm opacity-80'>Completed</div>
                                <div className='text-2xl font-bold'>{orders.filter(o => o.status === 'completed').length}</div>
                            </div>
                        </div>

                        {/* Table Header */}
                        <div className='grid grid-cols-7 bg-gray-50 text-gray-600 font-semibold py-4 px-6 border-b border-gray-200'>
                            <div>Order ID</div>
                            <div>Customer</div>
                            <div>Pizza Details</div>
                            <div>Type</div>
                            <div>Status</div>
                            <div>Payment</div>
                            <div>Amount</div>
                        </div>

                        {/* Order Rows */}
                        <div className='divide-y divide-gray-100'>
                            {orders.map(order => (
                                <div className='grid grid-cols-7 hover:bg-gray-50 transition-colors duration-150 py-4 px-6' key={order._id}>
                                    <div className="font-mono text-sm bg-gray-100 py-1 px-2 rounded w-fit">{order._id.slice(-8)}</div>
                                    <div>
                                        <div className="font-semibold text-gray-700">{order.userId.username}</div>
                                        <div className="text-gray-400 text-sm">{order.userId.email}</div>
                                    </div>
                                    <div>
                                        {order.pizzaType === 'standard' ? (
                                            <div>
                                                <div className="font-medium text-gray-700">{order.pizzaRef.title}</div>
                                                <div className="text-gray-400 text-sm">₹{order.pizzaRef.price}</div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="font-medium text-gray-700">Custom Pizza</div>
                                                <div className="text-gray-400 text-sm">{order.pizzaRef.base} + {order.pizzaRef.cheese}</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="capitalize flex items-center">
                                        <span className={`px-3 py-1 rounded-full text-xs ${order.pizzaType === 'standard' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                                            }`}>
                                            {order.pizzaType}
                                        </span>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => changeStatus(order._id, order.status)}
                                            className={`px-4 py-1.5 mt-1.5 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${order.status === 'completed' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                                                    order.status === 'working' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' :
                                                        'bg-red-100 text-red-700 hover:bg-red-200'
                                                }`}
                                        >
                                            {order.status === 'completed' ? '✓ ' : order.status === 'working' ? '⟳ ' : '⏱ '}
                                            {order.status}
                                        </button>
                                    </div>
                                    <div className="flex items-center">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${order.paymentStatus === 'success'
                                                ? 'bg-green-100 px-4 py-2  text-green-700'
                                                : 'bg-red-100 px-4 py-2  text-red-700'
                                            }`}>
                                            {order.paymentStatus === 'success' ? '✓ ' : '✕ '}
                                            {order.paymentStatus}
                                        </span>
                                    </div>
                                    <div className="font-bold text-gray-700 mt-1.5">₹{order.totalPrice}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderManagement