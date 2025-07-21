import { jwtDecode } from "jwt-decode"
import { Navigate } from "react-router-dom"


function AdminRoute({ children }) {
    const token = localStorage.getItem('token')

    if (!token) {
        return <Navigate to="/login" replace />
    }

    try {
        const decodedToken = jwtDecode(token)

        if (decodedToken.role !== 'admin') {
            return <Navigate to="/dashboard" replace />;
        }
        return children
    } catch (error) {
        localStorage.removeItem('token');
        return <Navigate to="/login" replace />;
    }
}
export default AdminRoute