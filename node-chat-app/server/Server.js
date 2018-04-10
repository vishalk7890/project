var path = require("path")
var socketIO=require("socket.io")
var express=require("express")
var http= require("http")
var port = process.env.PORT || 3000
var publicPath= path.join(__dirname, "../public")
const {generateMessage}=require("/home/dhawal/WebstormProjects/WebSocket/node-chat-app/server/Utils/message")

var app= express()


var server=http.createServer(app)
var io=socketIO(server)




app.use(express.static(publicPath))

io.on("connection",(socket) => {
    console.log("new user connected")

    socket.emit("newMessage", generateMessage("admin","welcome to this chat app")
    )

    socket.broadcast.emit("newMessage",generateMessage("admin","new user joined"))

    socket.on("createMessage",(message,callback)=>{
        console.log("create email",message)

        io.emit("newMessage",generateMessage(message.from,message.text))
        // socket.broadcast.emit("newMessage",{
        //     from:message.from,
        //     text:message.text,
        //     createdAt:new Date().getTime()
        // })
        callback("this is from server ")
    })


    socket.on("disconnect",(socket)=>{
        console.log("disconnected from the server")
    })

})

server.listen(port,()=>{
 console.log("connected to port ")
})




