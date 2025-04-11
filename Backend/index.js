import cors from 'cors'; //  allow FrontEnd (on another port) to connect Backend
import cookieParser from "cookie-parser" // parser cookies by browser
import express from 'express'; // for creating a web server .
import 'dotenv/config' // for imporing the data from .env file
import { connectDB } from './connection/db.js'; // loads variables from .env file
import authRoutes from "./routes/adminAuthRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userAuthRoutes.js"


const PORT = process.env.PORT; // port from .env file

const app = express();// create the express server instance

app.use(express.json()); // data will be in json() format (this middleware allow us to read JSON in request)


// HTTP Methods 
// HTTP methods( also called request methods) tell the server - what you want to do with data.
// They’re like commands sent from the frontend (browser or client) to the backend (your Express server).



// CORS Configuration (for frontend-backend comunication)
const corsOptions = {
    origin: process.env.FRONTEND_URI,
    credentials: true,  // allow sending cookies (like token)
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS", "PATCH"], // allow HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"]
}


app.use(cors(corsOptions))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/user", userRoutes)


connectDB() // mongoDB connected with express server
app.listen(PORT, () => console.log(`server is running on ${PORT}`)); // start/run the server on the defined port






