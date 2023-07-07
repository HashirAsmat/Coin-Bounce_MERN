const mongoose = require('mongoose');
const {Schema} = mongoose;
const whatsappSchema = new Schema({
message:{
    type:String,
},
user:{
        type:String,
    },
received:{
    type:Boolean,
}
},

{timestamps:true});

module.exports = mongoose.model("MessageContent",whatsappSchema,'messageContent');