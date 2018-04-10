var expect=require("expect")
var {generateMessage}=require("/home/dhawal/WebstormProjects/WebSocket/node-chat-app/server/Utils/message")
describe("generate message",()=>{
    it("it should generate the message",()=>{
        var from="jen"
        var text="somemessage"
        var message= generateMessage(from,text)

        expect(typeof message.createdAt).toBe("number")
        expect(message).toMatchObject({from, text})
    })
})