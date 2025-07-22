import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const Modal = ({ showModal, setShowModal }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Base', // default to first category
        quantity: 0,
        threshold: 0
    })
    async function Submit() {
        const token = localStorage.getItem('token')
        const {name,category,quantity,threshold} = formData
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/add-item`,{
                name,
                category,
                quantity,
                threshold
        } ,{
            headers: { token: token }
        })

    }
    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <h3 className="text-2xl font-bold mb-4 text-center">Add New Inventory Item</h3>

                        <form onSubmit={Submit} className="space-y-4">
                            {/* Item Name Input */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Item Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Enter item name"
                                    required
                                />
                            </div>

                            {/* Category Select */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value="Veggie">Veggie</option>
                                    <option value="Cheese">Cheese</option>
                                    <option value="Base">Base</option>
                                    <option value="Sauce">Sauce</option>
                                </select>
                            </div>

                            {/* Quantity Input */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Initial Quantity</label>
                                <input
                                    type="number"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Enter quantity"
                                    min="0"
                                    required
                                />
                            </div>

                            {/* Threshold Input */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Low Stock Threshold</label>
                                <input
                                    type="number"
                                    value={formData.threshold}
                                    onChange={(e) => setFormData({ ...formData, threshold: parseInt(e.target.value)  })}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Enter threshold"
                                    min="0"
                                    required
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                                >
                                    Add Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )

}

export default Modal