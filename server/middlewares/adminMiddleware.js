import jwt from "jsonwebtoken";

export default function adminMiddleware(req, res, next) {
    const tokenFromHeader = req.headers.token;
    
    
    if (!tokenFromHeader) {
        return res.status(401).json({ message: "Token missing" });
    }

    // Verify and decode the JWT
    const decoded = jwt.verify(tokenFromHeader, process.env.JWT_SECRET);
    // Destructure your custom payload fields
    const { userId, role } = decoded;


    // Check for admin role
    if (!userId || role !== 'admin') {
        return res.status(403).json({ message: "Not authorized" });
    }

    // Attach only the values you need
    req.userId = userId;
    req.userRole = role;
    next();
}