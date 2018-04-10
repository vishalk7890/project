const moment=require("moment")

// var date= new Date()
// console.log(date.getMonth())

var date= moment()
console.log(date.format("Do/Mo/YY"))
var time = moment()
console.log(time.format("H:mm A"))