import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [pizzas, setPizza] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

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

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const addToCart = (pizza) => {
        // TODO: Implement cart functionality
        alert(`Added ${pizza.title} to cart!`)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mx-auto mb-6"></div>
                    <div className="space-y-2">
                        <p className="text-xl font-bold text-gray-700">Loading delicious pizzas...</p>
                        <p className="text-sm text-gray-500">Preparing the perfect menu for you</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
            {/* Enhanced Navigation Bar */}
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo & Branding */}
                        <div className="flex items-center space-x-2">
                            <span className="text-3xl">🍕</span>
                            <span className="text-2xl font-bold text-gray-800 tracking-wide">Pizzeria</span>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {['Menu', 'Customize', 'My Pizzas', 'Orders'].map(label => (
                                <a
                                  key={label}
                                  href={`#${label.toLowerCase().replace(/ /g, '')}`}
                                  className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
                                >
                                  {label}
                                </a>
                            ))}
                        </div>

                        {/* Cart & Logout */}
                        <div className="flex items-center space-x-4">
                            <button className="relative bg-amber-500 hover:bg-amber-600 p-2 rounded-full transition">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                                </svg>
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">0</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Enhanced Hero Section */}
            <div
                className="relative h-[500px] bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
                }}
            >
                <div className="text-center text-white z-10 max-w-4xl px-4">
                    <div className="animate-bounce mb-6">
                        <span className="text-8xl">🍕</span>
                    </div>
                    <h1 className="text-5xl font-mono md:text-6xl font-bold mb-6 drop-shadow-2xl">
                       Mero Pizzeria
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 drop-shadow-lg max-w-2xl mx-auto leading-relaxed">
                        Authentic Italian pizzas made with love, fresh ingredients, and traditional recipes passed down through generations
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                            Order Now 🚀
                        </button>
                        <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-800 font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-all duration-300">
                           <a href="#menu"> View Menu 📖</a>
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
                            <p className="text-gray-600">Hot pizzas delivered in 30 minutes or less</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🌿</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Fresh Ingredients</h3>
                            <p className="text-gray-600">Only the finest, locally sourced ingredients</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">👨‍🍳</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Expert Chefs</h3>
                            <p className="text-gray-600">Crafted by professional Italian pizza makers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Pizza Grid Section */}
            <div id="menu" className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-gray-800 mb-6">Our Signature Pizzas</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Each pizza is a masterpiece, handcrafted with authentic Italian techniques and the finest ingredients from around the world
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {pizzas.map((pizza) => (
                        <div
                            key={pizza._id}
                            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 overflow-hidden group border border-gray-100"
                        >
                            {/* Enhanced Pizza Image */}
                            <div className="h-56 bg-gradient-to-br from-red-400 via-orange-400 to-yellow-400 relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <img height={400} width={480} src={pizza.image} alt="" />
                                </div>
                                <div className="absolute top-4 right-4">
                                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                        ⭐ Popular
                                    </span>
                                </div>
                                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                    {pizza.base || 'Classic Base'}
                                </div>
                            </div>

                            {/* Enhanced Pizza Details */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                                    {pizza.title}
                                </h3>
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                    {pizza.desc || "A delicious pizza made with fresh ingredients and traditional Italian techniques"}
                                </p>

                                {/* Ingredients Preview */}
                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {pizza.sauce && (
                                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                                                {pizza.sauce}
                                            </span>
                                        )}
                                        {pizza.cheese && (
                                            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                                                {pizza.cheese}
                                            </span>
                                        )}
                                        {pizza.veggies && pizza.veggies.slice(0, 2).map((veggie, index) => (
                                            <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                                {veggie}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Enhanced Price and Button */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-3xl font-bold text-green-600">
                                            ₹{pizza.price}
                                        </span>
                                        <div className="text-xs text-gray-500">
                                            <div>⭐ 4.8</div>
                                            <div>120+ orders</div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => addToCart(pizza)}
                                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
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

                {/* Enhanced Custom Pizza Section */}
                <div id="custom" className="mt-20 text-center">
  <div
    className="bg-[url('https://imgs.search.brave.com/ZjqlVuIMbjt7-5mIDT04ReaoTkCqRoaYbgml0xq3gVY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5zaHV0dGVyc3Rv/Y2suY29tL2ltYWdl/LXBob3RvL3NpeC1z/bGljZXMtcGl6emEt/ZGlmZmVyZW50LXRv/cHBpbmdzLTI2MG53/LTExNDEyOTEyNC5q/cGc')] 
    bg-cover bg-center rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto text-white relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="relative z-10">
      <div className="text-7xl mb-6 animate-pulse">🛠️</div>
      <h3 className="text-4xl font-bold font-sans font-stretch-50% mb-6">
        Create Your Dream Pizza
      </h3>
      <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed">
        Unleash your creativity! Choose from our premium ingredients and build the perfect pizza that matches your unique taste
      </p>
      <div className="flex justify-center space-x-4">
        <button onClick={()=>navigate("/make-customPizza")}  className="bg-white text-gray-800 hover:bg-gray-200 font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
          Build Your Pizza
        </button>
        <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-800 font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-all duration-300">
          View Ingredients
        </button>
      </div>
    </div>
  </div>
</div>

            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex justify-center items-center space-x-2 mb-4">
                        <span className="text-4xl">🍕</span>
                        <span className="text-3xl font-bold">Mario's Pizzeria</span>
                    </div>
                    <p className="text-gray-400 mb-6">Serving authentic Italian pizzas since 1995</p>
                    <div className="flex justify-center space-x-6">
                        <span className="text-gray-400">📞 +1 234 567 890</span>
                        <span className="text-gray-400">📧 hello@mariospizzeria.com</span>
                        <span className="text-gray-400">📍 123 Pizza Street, Food City</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Dashboard
