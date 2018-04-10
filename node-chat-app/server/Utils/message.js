var generateMessage=(from,text)=>{
    return{
        from,
        text,
        createdAt:new Date().getTime()
    }
}
var generateLocationMessage=(from,laat,loon)=>{
    return {
        from,
        url:`https://www.google.com/maps?q=${laat},${loon}`,
        createdAt: new Date().getTime()
    }
}
module.exports={generateMessage,generateLocationMessage}