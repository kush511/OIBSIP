
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/adminRoute';
import OrderManagement from './pages/OrderManagement';


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
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </>
  )


}


export default App
