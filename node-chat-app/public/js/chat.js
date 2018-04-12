var socket= io();
function scrollToBottom(){
    let messages=$("#messages")
    let newMessage=messages.children("li:last-child")
    let scrollTop=messages.prop("scrollTop")
    let clientHeight=messages.prop("clientHeight")
    let scrollHeight=messages.prop("scrollHeight")
    let newMessageHeight=newMessage.innerHeight()
    let lastMessageHeight=newMessage.prev().innerHeight()
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight)
    }
}
socket.on("connect",function (){
    console.log("connected to server")
    var params= $.deparam(window.location.search)
    socket.emit("join", params,function (err) {
        if(err){
            alert(err)
            window.location.href="/"
        }else{
            console.log("no error")
        }
    })
})
socket.on("disconnect",function(){
    console.log("disconnected from server")
})

socket.on("updateUserList",function (users) {
   var ol=$("<ol></ol>")
    users.forEach(function (user) {
        ol.append($("<li></li>").text(user))
    })
    $("#users").html(ol)
    console.log("Users list is :",users)
})

socket.on("newMessage",function (message) {
    var formattedTime=moment(message.createdAt).format("h:mm A")
    let template= $("#message-template").html()
    let html=Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt:formattedTime
    })
    $("#messages").append(html)
    scrollToBottom()
    //var formattedTime=moment(message.createdAt).format("h:mm A")
//     console.log("new message",message)
//     var li=jQuery('<li></li>')
//     li.text(`${message.from} ${formattedTime}, ${message.text}`)
//
//     $("#messages").append(li)
})


socket.on("newLocationMessage",function (message) {
    var formattedTime=moment(message.createdAt).format("h:mm A")
    let template= $("#location-message-template").html()
    let html= Mustache.render(template,{
        from:message.from,
        url:message.url,
        createdAt:formattedTime
    })
    $("#messages").append(html)
    scrollToBottom()
    // var li=$("<li></li>")
    // var a =$('<a target="_blank">my current location </a>')
    // li.text(`${message.from} ${formattedTime}:`)
    // a.attr('href',message.url)
    // li.append(a)
    // $("#messages").append(li)
})


$("#message-form").on("submit",function (e) {
    e.preventDefault()
    var messageTextBox=$("[name=message]")
    socket.emit("createMessage",{
        text:messageTextBox.val()
    },function () {
        messageTextBox.val("")
    })
})


var locationButton=$("#send-location")
locationButton.on("click",function () {
    if(!navigator.geolocation){
        return alert("geolocation not supported")
    }

    locationButton.attr("disabled","disabled").text("sending location : ")
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr("disabled").text("sending location : ")
       socket.emit("createLocationMessage",{
           lat:position.coords.latitude,
           lon:position.coords.longitude
       })
        //console.log(pos)
    },function () {
        locationButton.removeAttr("disabled").text("sending location : ")
        alert("unable to fetch location")

    })
})