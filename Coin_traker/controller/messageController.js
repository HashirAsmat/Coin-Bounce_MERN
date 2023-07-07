const Joi = require('joi');
const messages = require('../models/dbMessages');
const User = require('../models/user');
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const messageController = {

async create(req,res,next){

    const messageSchema = Joi.object({
        message:Joi.string().required(),
        userid:Joi.string().regex(mongodbIdPattern).required(),
        received:Joi.boolean().required()
    });

    const {error} = messageSchema.validate(req.body);
    if(error){
        return next(error)
    } 
    try{
        const {message,userid,received} = req.body;
         let user;
        try{
             user = await User.findOne({_id:userid});
        }
        catch(error){
            return next(next);
        }
        const newMessage = new messages({
            message,
            user:user.username,
            received
        });
        const newmessage = await newMessage.save();

        return res.status(201).json({message:newmessage});
    }
    catch(error){
        return next(error);
    }
},
async getAll (req,res,next){

    try{

        const allmessages = await messages.find({});
        return res.status(200).json({messages:allmessages});
    }
    catch(error){
        return next(error);
    }
}

}

module.exports = messageController;