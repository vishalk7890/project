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


server.listen(port,()=>{
 console.log("connected to port ")
})




//console.log9