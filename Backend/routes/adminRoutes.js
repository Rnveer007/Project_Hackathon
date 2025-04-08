import express from 'express';
import { createTest } from "../controller/admin.js"
import multer from "multer"
const upload = multer({ dest: "uploads/" })

const router = express.Router();

router.post("/create-test", upload.single("file"), createTest);


export default router;