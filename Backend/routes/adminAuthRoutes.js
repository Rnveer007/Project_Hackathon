import express from "express";
const router = express.Router();
import { loginAdmin, checkToken, logoutAdmin } from "../controller/auth.js";


router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
// router.post("/register", registerAdmin);
router.get("/check", checkToken)

export default router;
