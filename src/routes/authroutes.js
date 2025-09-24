// src/routes/authroutes.js
import express from "express";
import { signup, login, logout, me } from "../controllers/authcontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();          

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, me);

export default router;                     
