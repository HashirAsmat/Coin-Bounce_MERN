//this is user to filter data and send some specific data, not whole user object - DTO concept
class UserDTO{
    constructor(user){
        this._id= user.id;
        this.username=user.username;
        this.name=user.name;
        this.email=user.email;

    }
}

module.exports = UserDTO;