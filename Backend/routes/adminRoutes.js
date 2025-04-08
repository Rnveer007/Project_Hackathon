import express from 'express';
import { createTest } from "../controller/admin.js"

const router = express.Router();

router.post("", createTest)


export default router;