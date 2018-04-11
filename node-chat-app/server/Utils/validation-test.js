const expect=require("expect")
const {isRealString}=require("/home/dhawal/WebstormProjects/WebSocket/node-chat-app/server/Utils/validation.js")

describe("it should validate",()=>{
    it("should reject non-string values",()=>{
        var res= isRealString(98)
        expect(res).toBe(false)

    })
    it("should reject with space",()=>{
        var res=isRealString("   ")
        expect(res).toBe(false)

    })
    it("should allow string with non space char",()=>{
        var res=isRealString("  andare  ")
        expect(res).toBe(true)
    })
})