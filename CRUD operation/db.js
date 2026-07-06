const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config();

async function connectDB(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("DB Connected")
    })
    .catch((err)=>{
        console.log(err)
        process.exit(1);
    })
}
module.exports = connectDB;