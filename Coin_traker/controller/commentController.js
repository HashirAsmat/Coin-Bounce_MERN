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
async getAll(req,res,next){
    try{
        //1.find all blogs
        const comments = await Comment.find({}); //when we pass an empty filter into find method , it will give all the blog data 
        //2. convert all blogs into blogsdto and store it in array
        const commentsDto = [];
        for (let i=0;i<comments.length;i++){ //it can also we done through .map() method.
            const dto = new CommentDTO(comments[i]);
            commentsDto.push(dto);
        }
        //3.send the resp i-e array of blogsdto
        return res.status(200).json({comments:commentsDto});
    }
    catch(error){
        return next(error);
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
