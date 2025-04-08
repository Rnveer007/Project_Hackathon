import express from 'express';
import multer from "multer"

import {
    createTest,
    deleteTest,
    issueTest,
    updateTest,
    viewTest
} from "../controller/admin.js";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/create-test", upload.single("file"), createTest);
router.get("/view-test", viewTest);
router.delete("/delete/:id", deleteTest);
router.patch("update/:id", updateTest);
router.patch("issue/:id", issueTest);

export default router;