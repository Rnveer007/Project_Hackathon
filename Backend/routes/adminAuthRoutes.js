// Existing imports...
import express from "express";
const router = express.Router();
import { loginAdmin, registerAdmin } from "../controller/auth.js";


router.post("/login", loginAdmin);
router.post("/register", registerAdmin);

export default router;
