import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.socket.remoteAddress;
    const logLine = `${timestamp} ${ip} - "${method} ${url}"\n`;

    fs.appendFile("./log.txt", logLine, (err)=>{
        return err;
    })
    res.end("You are at " + `${url}`)
})
const PORT = 8000
server.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})