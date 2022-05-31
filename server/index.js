const express =require('express')
const app = express()
const http = require("http")
const cors = require('cors')
const {Server} = require("socket.io")

app.use(cors())
const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
});

io.on("connection", (sokect)=>{
    console.log(`User connected${sokect.id}`);
    sokect.on("join_room",(data)=>{
        sokect.join(data)
    })
    sokect.on("send_message", (data)=>{
       sokect.to(data.room).emit("receive_message",data)
    })
    sokect.on("disconnect",()=>{
        console.log(`user disconnected ${sokect.id}`);
    })
    
})

server.listen(3001, ()=>{
    console.log("Server Running");
})