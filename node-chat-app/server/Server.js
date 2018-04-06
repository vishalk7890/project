const express=require("express")
const app= express()
const path = require("path")
const publicPath= path.join(__dirname, "../public")
const port = process.env.PORT || 3000
console.log(__dirname + "/../public")
app.use(express.static(publicPath))
// app.get("/home/dhawal/WebstormProjects/WebSocket/node-chat-app/public/index.html",(req,res)=>{
//  req.send()
// })

app.listen(port,()=>{
 console.log('server is up');
})



//console.log9