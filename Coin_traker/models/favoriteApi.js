const mongoose = require('mongoose');
const {Schema} = mongoose;
const favoriteApiSchema = new Schema({
api:{
    type:String,
},
user:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'User'
    },
},

{timestamps:true});

module.exports = mongoose.model("FavoriteApi",favoriteApiSchema,'favoriteApi');