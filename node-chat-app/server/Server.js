var path = require("path")
var socketIO=require("socket.io")
var express=require("express")
var http= require("http")
var port = process.env.PORT || 3000
var publicPath= path.join(__dirname, "../public")


var app= express()


var server=http.createServer(app)
var io=socketIO(server)




app.use(express.static(publicPath))

io.on("connection",(socket) => {
    console.log("new user connected")
    socket.emit("newMessage",{
        from:"vishalbhauu@example.com",
        text:"wasssup",
        createdAt: 123
    })


    socket.on("createMessage",(message)=>{
        console.log("create email",message)


    })


    socket.on("disconnect",(socket)=>{
        console.log("disconnected from the server")
    })

})

server.listen(port,()=>{
 console.log("connected to port ")
})




