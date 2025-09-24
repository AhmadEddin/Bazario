// src/middleware/authmiddleware.js
import jwt from "jsonwebtoken";
import User from "../model/user.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const bearer = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  const cookieToken = req.cookies?.token;
  const token = bearer || cookieToken;

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "User not found" });
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
