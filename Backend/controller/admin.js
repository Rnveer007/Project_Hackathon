import bcrypt from "bcrypt"; // using for password hashing.
import "dotenv/config";
import jwt from "jsonwebtoken"; // to create token  for authantication.
import Admin from "../models/adminLoginModel";

// always take two arguments. 
export async function loginAdmin(req, res) {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email })
        if (!admin) {
            return res.status(401).json({ message: "Invailid Credentials" })
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invailid Credentials" })
        }

        const adminToken = jwt.sign(
            {
                id: admin._id,
                email: admin.email,
                // role: "admin"
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        
        res.cookie("adminToken",adminToken,{
            httpsOnly:true,
            secure:false,
            sameSite:'none',
            // maxAge:36000000,
        })

        res.status(200).json({
            message:"Admin logged in Successfully",
            token,
            admin:{
                id:admin._id,
                email:admin.email,
            },
        })

    } catch (error) {
        console.log("Login Error",error)
        res.status(500).json({message:"Seerver Error",error:error.message})
    }

}


export async function  registerAdmin(req,res){
    try {
        
    
   const {name,email,password} = req.body

   const existingUser = await Admin.findOne({email})
    if(existingUser) return  res.status(400).json({message:'User Already Exist'})

        const hashedPassword = await bcrypt.hash(password,10)
         
        const newAdmin = new Admin({
         name,
         email,
         password:hashedPassword

        });

        await newAdmin.save()
        res.status(201).json({message:'Admin Registered Successfully'})}
        catch(error){
console.log(error);
res.status(500).json({message:'Error in Registering'})

        }
}