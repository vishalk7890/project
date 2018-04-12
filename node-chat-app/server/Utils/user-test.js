const {User}=require("./Users")
const expect=require("expect")

describe("users",()=>{
    var use
    beforeEach(()=>{
        use=new User()
        use.users=[{
            id:"1",
            name:"asdasd",
            room:"a"
        },{
            id:"2",
            name:"aasdadasd",
            room:"b"
        },{
            id:"3",
            name:"asafasdasd",
            room:"a"
        }]
    })
    it("should add new users",()=>{
        var users= new User()
        var user={
            id:"1234",
            name:"vishal",
            room:"office fans"
        }
        var resUser=users.addUser(user.id,user.name,user.room)

        expect(users.users).toEqual([user])
    })
    it("should find user",()=>{
        var userID="2"
        var user= use.getUser(userID)
        expect(use.id).toBe(userID)
    })

    it("should remove user",()=>{
        var Uid="1"
        var User1=use.removeUser(Uid)
        expect(use.id).toBe(Uid)
        expect(users.users.length).toBe(2)


    })
    it("should not remove the user",()=>{
        var Uid="99"
        var User1=use.removeUser(Uid)
        expect(use.id).toBeFalsy(Uid)
        expect(users.users.length).toBe(3)
    })
    it("should return names for node course",()=>{
        var userlist=use.getUserlist("a")
        expect(userlist).toEqual(["asdasd","asafasdasd"])
    })
    it("should return names for react course",()=>{
        var userlist=use.getUserlist("b")
        expect(userlist).toEqual(["aasdadasd"])
    })

})