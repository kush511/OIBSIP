
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/adminRoute';
import OrderManagement from './pages/OrderManagement';
import Inventory from './pages/Inventory';
import PizzaManagement from './pages/PizzaManagement';
import CustomPizzaPage from './pages/CustomPizzaPage';
import MyCustomPizzasPage from './pages/MyCustomPizzaPage';
import CartPage from './pages/CartPage';
import MyOrdersPage from './pages/MyOrdersPage';


function App() {
  function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />


          <Route path="admin/dashboard" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>

          } />
          <Route path="admin/order-manage" element={
            <AdminRoute>
              <OrderManagement />
            </AdminRoute>

          } />

          <Route path="admin/Inventory" element={
            <AdminRoute>
              <Inventory />
            </AdminRoute>

          } />

          <Route path="admin/public-pizza" element={
            <AdminRoute>
              <PizzaManagement />
            </AdminRoute>

          } />


          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="/customPizzas/mine" element={
            <PrivateRoute>
              <MyCustomPizzasPage />
            </PrivateRoute>
          } />

          <Route path="/make-customPizza" element={
            <PrivateRoute>
              <CustomPizzaPage />
            </PrivateRoute>
          } />

          <Route path="/cart" element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          } />
          
          <Route path="/my-orders" element={
            <PrivateRoute>
              <MyOrdersPage />
            </PrivateRoute>
          } />

          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </>
  )


}


export default App
