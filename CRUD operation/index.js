const server = require("http");
const app = require("./app");

const actualServer = server.createServer(app);

actualServer.listen(3000, ()=>{
    console.log("server started");
})