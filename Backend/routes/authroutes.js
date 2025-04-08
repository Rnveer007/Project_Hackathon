import express from "express"
import { loginAdmin, registerAdmin } from "../controller/auth.js";

const router = express.Router();

router.post("/admin/login", loginAdmin);
router.post("/admin/register", registerAdmin)

export default router;