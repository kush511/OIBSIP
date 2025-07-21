import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [pizzas, setPizza] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPizzas();
    }, [])

    async function fetchPizzas() {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/pizza`, {
                headers: {
                    token: token 
                }
            })
            setPizza(response.data.pizzas)
            setLoading(false)
        } catch (error) {
            console.log('Error fetching pizzas:', error);
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                    <p className="text-lg font-medium text-gray-600">Loading delicious pizzas...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
            {/* Hero Section */}
            <div
                className="relative h-96 bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
                }}
            >
                <div className="text-center text-white z-10">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                        🍕 Pizzeria
                    </h1>
                    <p className="text-xl md:text-2xl mb-6 drop-shadow-md">
                        Fresh, Hot like you & Delicious Pizzas Made Just For You
                    </p>
                    <div className="animate-bounce">
                        <svg className="w-8 h-8 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Pizza Grid Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Signature Pizzas</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Handcrafted with love, made with the freshest ingredients, and baked to perfection
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pizzas.map((pizza) => (
                        <div
                            key={pizza._id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
                        >
                            {/* Pizza Image Placeholder */}
                            <div className="h-48 bg-gradient-to-br from-red-400 to-orange-400 relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-6xl">🍕</span>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        Fresh
                                    </span>
                                </div>
                            </div>

                            {/* Pizza Details */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                                    {pizza.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                    {pizza.desc}
                                </p>

                                {/* Price and Button */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <span className="text-3xl font-bold text-green-600">
                                            ₹{pizza.price}
                                        </span>
                                    </div>

                                    <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 transform hover:scale-105 transition-all duration-200 shadow-lg">
                                        <span>Add to Cart</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Custom Pizza Section */}
                <div className="mt-16 text-center">
                    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border-2 border-double border-orange-300">
                        <div className="text-6xl mb-4">🛠️</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Create Your Own Pizza
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Can't find your perfect pizza? Build it yourself with our amazing ingredients!
                        </p>
                        <button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg">
                            Build Your Pizza 🍕
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
