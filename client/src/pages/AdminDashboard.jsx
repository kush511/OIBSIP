import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const AdminDashboard = () => {
const [totalOrders,setTotalOrders] = useState(0)
const [lowStockItemsCount,setLowStockItemsCount] = useState(0)
const [totalMenuPizzas,setTotalMenuPizzas] = useState(0)
const navigate = useNavigate()

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
     

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/stats`,
          {
            headers: {
              token:token,
            },
          }
        );
        setTotalOrders(response.data.totalOrders);
        setLowStockItemsCount(response.data.lowStockItemsCount);
        setTotalMenuPizzas(response.data.totalMenuPizzas);
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
      }
    };

    fetchStats();
  }, []);

  function Logout() {
    localStorage.removeItem('token')
   navigate("/login")
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='bg-white rounded-lg shadow-sm p-8 mb-8 flex  flex-row justify-between'>
         <div>
           <h1 className='text-5xl font-bold text-gray-800 mb-2'>Admin Dashboard</h1>
          <p className='text-gray-600 text-xl'>Welcome back, Admin! Manage your pizza business.</p>
         
         </div>

        
<div className='flex justify-center items-center'>
        <div className='flex px-5 text-white bg-blue-400 hover:bg-blue-500 justify-center items-center h-11 rounded-md font-medium'>
          <a href="http://localhost:5173/dashboard"  target="_blank" >View Site ↗</a>
        </div>
  
          <div className='my-5 mx-5 bg-red-500 px-5 py-2 rounded-md hover:bg-red-600 text-xl font-semibold text-gray-100 '>
            <button className='cursor-pointer' onClick={Logout}>Logout</button>
            </div>
</div>

            
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white border border-gray-200 flex flex-col items-center justify-center p-6 shadow-md hover:-translate-y-1 hover:shadow-lg rounded-lg transition-all duration-200'>
            <span className='font-semibold text-lg text-gray-700 mb-2'>Total Orders</span>
            <span className='text-3xl font-bold text-blue-600'>{totalOrders}</span>
          </div>
          <div className='bg-white border border-gray-200 flex flex-col items-center justify-center p-6 shadow-md hover:-translate-y-1 hover:shadow-lg rounded-lg transition-all duration-200'>
            <span className='font-semibold text-lg text-gray-700 mb-2'>Low Stock Items</span>
            <span className='text-3xl font-bold text-red-500'>{lowStockItemsCount ?? "0"}</span>
          </div>
          <div className='bg-white border border-gray-200 flex flex-col items-center justify-center p-6 shadow-md hover:-translate-y-1 hover:shadow-lg rounded-lg transition-all duration-200'>
            <span className='font-semibold text-lg text-gray-700 mb-2'>Total Pizzas</span>
            <span className='text-3xl font-bold text-green-600'>{totalMenuPizzas}</span>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div onClick={() => navigate('/admin/order-manage')} className='bg-white h-48 border border-gray-200 flex flex-col justify-center items-center p-6 shadow-md hover:-translate-y-1 hover:shadow-lg rounded-lg cursor-pointer transition-all duration-200'>
            <span className="text-5xl mb-3">📋</span>
            <span className='text-xl font-semibold text-gray-800 mb-2'>Order Management</span>
            <span className='text-gray-600 text-center'>View and manage customer orders</span>
          </div>
          <div  onClick={() => navigate('/admin/inventory')} className='bg-white h-48 border border-gray-200 flex flex-col justify-center items-center p-6 shadow-md hover:-translate-y-1 hover:shadow-lg rounded-lg cursor-pointer transition-all duration-200'>
            <span className="text-5xl mb-3">📦</span>
            <span className='text-xl font-semibold text-gray-800 mb-2'>Inventory</span>
            <span className='text-gray-600 text-center'>Manage ingredients and stock levels</span>
          </div>

          {/* Here we will add a onclick and navigate to admin/public-pizza page, we will create a new page  */}
          <div onClick={() => navigate('/admin/public-pizza')}  className='bg-white h-48 border border-gray-200 flex flex-col justify-center items-center p-6 shadow-md hover:-translate-y-1 hover:shadow-lg rounded-lg cursor-pointer transition-all duration-200'>
            <span className="text-5xl mb-3">🍕</span>
            <span className='text-xl font-semibold text-gray-800 mb-2'>Pizza Management</span>
            <span className='text-gray-600 text-center'>Add, edit, and manage pizza menu</span>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default AdminDashboard
