import cors from 'cors';
import cookieParser from "cookie-parser"
import express from 'express'; // for creating a server .
import 'dotenv/config' // for imporing the data from .env file
import { connectDB } from './connection/db.js';
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


const PORT = process.env.PORT;

const app = express();

app.use(express.json()); // data will be in json() format

const corsOptions = {
    origin: process.env.FRONTEND_URI,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowHolders: ["Content-Type", "Authorization"]
}


app.use(cors(corsOptions))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)


connectDB() // mongoDB connected with express server
app.listen(PORT, () => console.log(`server is running on ${PORT}`)); //(listen) for start/run the server




