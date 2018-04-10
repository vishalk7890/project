var moment= require("moment")

var generateMessage=(from,text)=>{
    return{
        from,
        text,
        createdAt:moment().valueOf()
    }
}
var generateLocationMessage=(from,laat,loon)=>{
    return {
        from,
        url:`https://www.google.com/maps?q=${laat},${loon}`,
        createdAt: moment().valueOf()
    }
}
module.exports={generateMessage,generateLocationMessage}