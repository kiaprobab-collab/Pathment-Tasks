import express from "express"
import {app} from "./app.js";
import { connectDB } from "./db/db.js"
import { createServer } from "node:http"
import dotenv from "dotenv";



dotenv.config();

async function startDB(){
    await connectDB().then(()=> {
        const server = createServer(app);
        const PORT = process.env.PORT || 3000
        server.listen(PORT, ()=> {
            console.log(`Sever started at PORT:${PORT}`);
        })
    })
}

startDB().catch((err)=>{
    console.error(err);
})