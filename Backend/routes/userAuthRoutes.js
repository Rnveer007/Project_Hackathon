import express from "express"
import { checkUserToken, loginUser, logoutUser, registerUser, } from "../controller/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser)
router.post("/register", registerUser)
router.get("/checkToken", checkUserToken)


export default router;