var path = require("path")
const moment=require("moment")
const {isRealString}=require("/home/dhawal/WebstormProjects/WebSocket/node-chat-app/server/Utils/validation")
var socketIO=require("socket.io")
var express=require("express")
var http= require("http")
var port = process.env.PORT || 3000
var publicPath= path.join(__dirname, "../public")
const {User}=require("/home/dhawal/WebstormProjects/WebSocket/node-chat-app/server/Utils/Users")
//const{generateLocationMessage,}=require("/home/dhawal/WebstormProjects/WebSocket/node-chat-app/server/Utils/")
const {generateMessage,generateLocationMessage}=require("/home/dhawal/WebstormProjects/WebSocket/node-chat-app/server/Utils/message")

var app= express()


var server=http.createServer(app)
var io=socketIO(server)
let users=new User()




app.use(express.static(publicPath))

io.on("connection",(socket) => {
    console.log("new user connected")



    socket.on("join",(params,callback)=>{
        if(!isRealString(params.name)|| !isRealString(params.room)){
             return callback("name and room name are required")
        }

        socket.join(params.room)
        users.removeUser(socket.id)
        users.addUser(socket.id,params.name,params.room)
        io.to(params.room).emit("updateUserList",users.getUserlist(params.room))

        socket.emit("newMessage", generateMessage("admin","welcome to this chat app"))


        socket.broadcast.to(params.room).emit("newMessage",generateMessage("admin",`${params.name} has joined`))
        callback()
    })

    socket.on("createMessage",(message,callback)=>{
        console.log("create email",message)

        io.emit("newMessage",generateMessage(message.from,message.text))

        callback()
    })

    socket.on("createLocationMessage",(coords)=>{
        io.emit("newLocationMessage",generateLocationMessage("admin",coords.lat,coords.lon))
    })

    socket.on("disconnect",()=>{
        let user=users.removeUser(socket.id)

        if(user){
            io.to(user.room).emit("updateUserList",users.getUserlist(user.room))
            io.to(user.room).emit("newMessage",generateMessage("admin",`${user.name} has left`))
        }
        console.log("disconnected from the server")
    })

})

server.listen(port,()=>{
 console.log("connected to port ")
})




