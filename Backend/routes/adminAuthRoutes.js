import express from "express";
const router = express.Router();
import { loginAdmin, registerAdmin, checkToken} from "../controller/auth.js";


router.post("/login", loginAdmin);
router.post("/register", registerAdmin);
router.get("/check", checkToken)

export default router;
