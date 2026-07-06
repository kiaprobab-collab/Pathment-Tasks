const {createServer} =  require("http");
const app = require("./app");
const connectDB = require("./db")

connectDB().then(()=>{
    
const server = createServer(app);

const PORT = 3001;
server.listen(PORT, ()=>{
    console.log(`Server started on PORT: ${PORT}`)
})
}).catch(()=>{
    console.log("Server connection err")
})




