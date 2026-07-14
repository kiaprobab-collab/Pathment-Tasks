import mongoose from "mongoose";
import { createServer } from "node:http"
import { connectDB } from "./src/db/db.js";
import { app } from "./app.js";


async function startDB() {
    await connectDB().then(() => {
        const server = createServer(app);
        const PORT = process.env.PORT || 3000
        server.listen(PORT, ()=>{
            console.log("Server Started")
        })
    })
}

startDB().catch((err)=> {
    console.log("Server connection err")
})
