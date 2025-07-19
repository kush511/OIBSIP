import  jwt  from "jsonwebtoken";

export default function AuthMiddleware(req, res, next) {
    const tokenFromHeader = req.headers.token;
  if (!tokenFromHeader) {
        return res.status(401).json({ message: "Token missing" });
    }
    const decoded = jwt.verify(tokenFromHeader, process.env.JWT_SECRET)
    
    
    if (decoded) {
        req.userId = decoded
        next()
    }
    else {
        return res.status(403).json({
            message: "Not verified"
        })
    }
}