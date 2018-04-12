class User {
    constructor() {
        this.users = []

    }
    addUser(id,name,room){
        var user={
            id,
            name,
            room
        }
        this.users.push(user)
    }

    removeUser(id){
        var user=this.getUser(id)

        if(user){
            this.users=this.users.filter((user)=>user.id!==id)

        }
        return user

    }
    getUser(id){
        return this.users.filter((use)=>use.id===id)[0]

    }
    getUserlist(room){
        var user=this.users.filter((use)=>use.room===room)
        var nameArray=user.map((user)=>user.name)

        return nameArray
    }
}

module.exports={User}