import jwt from "jsonwebtoken"

export default function getToken(payload) {
  
  console.log('JWT payload:', payload);

  return jwt.sign(payload, process.env.JWT_SECRET);
}
