const mongoose = require("mongoose");

const {MONGODB_CONNECTION_STRING} = require("../config/index");

async function ConnectionDB (){
    try{
        const DB = await mongoose.connect(MONGODB_CONNECTION_STRING);
        console.log(`Database connected:${DB.Connection.name}`);
    }
    catch(err){
        console.log(err);
    }
};

module.exports = ConnectionDB;