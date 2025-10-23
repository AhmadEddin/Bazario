import express from "express";
import { 
  createOrder, 
  getBuyerOrders, 
  getOrderById,
  getSellerOrders,
  getSellerAnalytics 
} from "../conntrolers/ordercontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();
router.post("/place", authMiddleware, createOrder);           
router.get("/my", authMiddleware, getBuyerOrders);            
router.get("/:id", authMiddleware, getOrderById);             
router.get("/seller", authMiddleware, getSellerOrders);    
router.get("/seller/analytics", authMiddleware, getSellerAnalytics); 

export default router;