const mongoose = require("mongoose");
const {Schema} = mongoose;

const blogScehma = new Schema({
    title: {
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    photopath:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User' // in reference we pass the name of the model
    }
}, {timestamps:true})


//first argument is MODEL name i-e "Blog" , sencond argument i-e blogSchema is the Schema that we have created for model and our collection, Third argument i-e 'blogs' is the name of collection in our database for blogs documents , that will be created on blogSchema.
module.exports = mongoose.model("Blog" , blogScehma, "blogs");
