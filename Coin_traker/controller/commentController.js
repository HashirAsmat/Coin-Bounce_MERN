const Joi = require("joi");
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const Comment = require('../models/comment');
const CommentDTO = require('../dto/comment');
const commentController = {

async create (req,res,next){

const createCommentSchema = Joi.object({
content:Joi.string().required(),
blog:Joi.string().regex(mongodbIdPattern).required(),
author:Joi.string().regex(mongodbIdPattern).required()
});
const {error} = createCommentSchema.validate(req.body);
if(error){
    return next(error);
}
const {content,blog,author} = req.body;
try{
const newComment =  new Comment({
    content,
    blog,
    author
});
await newComment.save();
res.status(201).json({comment:'comment created!'});
}
catch(error){
return next(error)
}
},

async getById(req,res,next){
    const getByIdSchema = Joi.object({
        id:Joi.string().regex(mongodbIdPattern).required()
        });
        const {error} = getByIdSchema.validate(req.params);
        if(error){
            return next(error);
        }
        const {id} = req.params;
        try{
            const comments = await Comment.find({blog:id}).populate('author');
            const commentsDto = [];
            for (let i = 0 ; i < comments.length; i++){
                const obj= new CommentDTO(comments[i]);
                commentsDto.push(obj);
            }
            res.status(200).json({data:commentsDto});
        }
        catch(error){
            return next(error)
        }
}
}

module.exports = commentController;
