import express from 'express';
import multer from "multer"

import authCheckMiddleware from "../middleware/authCheckMiddleware.js"

import {
    createTest,
    deleteTest,
    issueTest,
    updateTest,
    viewTest
} from "../controller/admin.js";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/create-test", authCheckMiddleware, upload.single("file"), createTest);
router.get("/view-test", authCheckMiddleware, viewTest);
router.delete("/delete/:id", authCheckMiddleware, deleteTest);
router.patch("update/:id", authCheckMiddleware, updateTest);
router.patch("issue/:id", authCheckMiddleware, issueTest);

export default router;