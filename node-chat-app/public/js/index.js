var socket= io();

socket.on("connect",function (){
    console.log("connected to server")



})
socket.on("disconnect",function(){
    console.log("disconnected from server")
})

socket.on("newMessage",function (message) {
    console.log("new message",message)
    var li=jQuery('<li></li>')
    li.text(`${message.from}, ${message.text}`)

    $("#messages").append(li)
})


socket.on("newLocationMessage",function (message) {
    var li=$("<li></li>")
    var a =$('<a target="_blank">my current location </a>')
    li.text(`${message.from}:`)
    a.attr('href',message.url)
    li.append(a)
    $("#messages").append(li)
})


$("#message-form").on("submit",function (e) {
    e.preventDefault()

    socket.emit("createMessage",{
        from:"User",
        text:jQuery("[name=message]").val()
    },function () {

    })
})


var locationButton=$("#send-location")
locationButton.on("click",function () {
    if(!navigator.geolocation){
        return alert("geolocation not supported")
    }


    navigator.geolocation.getCurrentPosition(function (position) {
       socket.emit("createLocationMessage",{
           lat:position.coords.latitude,
           lon:position.coords.longitude
       })
        //console.log(pos)
    },function () {
        alert("unable to fetch location")
    })
})