import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

export async function connectDB(){
       await mongoose.connect(process.env.MONGO_URI)
       .then(()=>{
           console.log("DB Connected")
       })
       .catch((err)=>{
           console.log(err)
           process.exit(1);
       })
}
