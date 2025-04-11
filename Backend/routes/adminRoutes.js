import express from 'express';
import multer from "multer"

// import authCheckMiddleware from "../middleware/authCheckMiddleware.js"

import {
    createTest,
    deleteTest,
    issueTest,
    updateTest,
    viewTest
} from "../controller/admin.js";
import { checkToken } from '../controller/auth.js';

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/create-test", checkToken, upload.single("file"), createTest);
router.get("/view-test", checkToken, viewTest);
router.delete("/delete/:id", checkToken, deleteTest);
router.patch("/update/:id", checkToken, updateTest);
router.patch("/issue/:id", checkToken, issueTest);

export default router;