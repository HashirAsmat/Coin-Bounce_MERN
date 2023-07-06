const mongoose = require("mongoose");
const pusher = require('../pusher/pusher');
const {MONGODB_CONNECTION_STRING} = require("../config/index");

async function ConnectionDB (){
    try{
        const DB = await mongoose.connect(MONGODB_CONNECTION_STRING);
        console.log(`Database connected:${DB.Connection.name}`);
    }
    catch(err){
        console.log(err);
    }
    // clever programeer - whatsapp clone -> 3:00:00
    const db = mongoose.connection;
        const msgCollection = db.collection("messageContent");
        const changeStream = msgCollection.watch();
        changeStream.on('change', (change)=>{
            console.log("a change occured", change);
            if(change.operationType === 'insert'){
                const messageDetails = change.fullDocument;
                
                pusher.trigger('messages', 'inserted',{
                    user:messageDetails.user,
                    message:messageDetails.message,
                });
            }
            else{
                const error = {
                    message:"Error triggering Pusher"
                }
                next(error);
            }
    })
};

module.exports = ConnectionDB;