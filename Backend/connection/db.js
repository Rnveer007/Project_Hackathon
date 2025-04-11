// we can connect mongoDB and express with mongoose
import mongoose from "mongoose";  
import 'dotenv/config';


//connect MongoDB using Mongoose
export async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI); // mongoDBconnected with mongo
}