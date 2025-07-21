import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/allOrders`, {
                headers: { token: token }
            });
            setOrders(response.data.orders);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading orders...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Management</h1>
                
                {/* Orders will be displayed here */}
                <div className="space-y-4">
                    {orders.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No orders found</p>
                    ) : (
                        orders.map(order => (
                            <div key={order._id} className="bg-white p-6 rounded-lg shadow">
                                <p>Order ID: {order._id}</p>
                                <p>Status: {order.status}</p>
                                <p>Total: ₹{order.totalPrice}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderManagement;
