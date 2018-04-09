var socket= io();

socket.on("connect",function (){
    console.log("connected to server")



    socket.emit("createMessage",{
        to:"andrewmead@gmail.com",
        text:"ok i hope this works"
    })
})
socket.on("disconnect",function(){
    console.log("disconnected from server")
})

socket.on("newMessage",function (message) {
    console.log("new Email",message)
})
