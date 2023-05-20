//model for jwt refresh token
const mongoose = require("mongoose");
const {Schema} = mongoose;
const refreshTokenSchema = Schema({
    token:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId, ref:'User'
    }
}, {timestamps:true});

module.exports = mongoose.model("RefreshToken",refreshTokenSchema,'tokens');
//we are storing token's in DB those who are logged in , so thus we can also have the trace of people who are currently active logged-in

