var expect=require("expect")
var {generateMessage,generateLocationMessage}=require("/home/dhawal/WebstormProjects/WebSocket/node-chat-app/server/Utils/message")
describe("generate message",()=>{
    it("it should generate the message",()=>{
        var from="jen"
        var text="somemessage"
        var message= generateMessage(from,text)

        expect(typeof message.createdAt).toBe("number")
        expect(message).toMatchObject({from, text})
    })
})

describe("generata location ",()=>{
    it("should generate correct location",()=>{
        var from="der"
        var lat=15
        var lon=23
        var url='https://www.google.com/maps?q=15,23'
        var message=generateLocationMessage(from,lat,lon)

        expect(typeof message.createdAt).toBe("number")
        expect(message).toMatchObject({from, url})
    })
})