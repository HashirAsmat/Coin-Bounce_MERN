const Joi = require('joi');
const fs = require('fs'); //file system node builtin module for storage pic in harddisk
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const {BACKEND_SERVER_PATH} = require('../config/index');
const BlogDTO = require('../dto/blog');
const BlogDetailsDTO = require('../dto/blog-details');
const blog = require('../models/blog');
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const blogController = {
    async create(req,res,next){
        console.log("blog create fun")
        //1. validate req body according to the model 
        const createBlogSchema = Joi.object({
            title:Joi.string().required(),
            content:Joi.string().required(),
            photo:Joi.string().required(), // client side will send photo in -> base64 encoded string -> we will decode it -> then store it locally -> and save photo's path in DB
            author:Joi.string().regex(mongodbIdPattern).required(),
        }) 
        const {error} = createBlogSchema.validate(req.body);
        if (error){
            return next(error);
        }
        const {title,content,photo,author} = req.body;
        //2. handle photostorage , naming
        //// To handle picture  time: 3:50:00
        //a. read as buffer -> through node buffer we can handle binary data stream
        const buffer =  Buffer.from(photo.replace(/^data:image\/(png|jpg|ipeg);base64,/,''),'base64') //reading photo and replacing data URI i-e (data:image/png;base64,iVBORw0KGg...) with ->  empty string i-e '''

        //b. allot a random name
        const imagePath = `${Date.now()}-${author}.png`;
        //c. save locally 
        try{
            fs.writeFileSync(`storage/${imagePath}`,buffer);
        }
        catch(error){
            return next(error)
        }
        //3.save blog in DB
        try{
            const newBlog = new Blog({
                title,
                author, //author refers to the user id who would be craeting a new blog
                content,
                photopath:`${BACKEND_SERVER_PATH}/storage/${imagePath}`
            })
            await newBlog.save();
        //4. return response 
        const blogdto = new BlogDTO(newBlog)
        return res.status(201).json({blog:blogdto})
        }
        catch(error){
        return next(error);
        }

    },
    async getAll(req,res,next){
        try{
            //1.find all blogs
            const blogs = await Blog.find({}); //when we pass an empty filter into find method , it will give all the blog data 
            //2. convert all blogs into blogsdto and store it in array
            const blogsdto = [];
            for (let i=0;i<blogs.length;i++){ //it can also we done through .map() method.
                const dto = new BlogDTO(blogs[i]);
                blogsdto.push(dto);
            }
            //3.send the resp i-e array of blogsdto
            return res.status(200).json({blogs:blogsdto});
        }
        catch(error){
            return next(error);
        }
    },
    async getById(req,res,next){
//1. validate id
const getByIdSchema = Joi.object({
    id:Joi.string().regex(mongodbIdPattern).required()
}) 
const {error} = getByIdSchema.validate(req.params);
if (error){
    return next(error);
}
const {id} = req.params;
try{
    
    const blog = await Blog.findOne({_id:id}).populate('author');
   const blogDetailDto = new BlogDetailsDTO(blog)
   //2. send response
    return res.status(200).json({blog:blogDetailDto});
}
catch(error){
    return next(error);
}

    },
    async update(req,res,next){
    //1. validate body
        const updateBlogSchema = Joi.object({
            title:Joi.string().required(),
            content:Joi.string().required(),
            author:Joi.string().regex(mongodbIdPattern).required(),
            blogId:Joi.string().regex(mongodbIdPattern).required(),
            photo:Joi.string(),
        })

        const {error} = updateBlogSchema.validate(req.body);
        if (error){
            return next (error);
        }
        const {title,content,author, blogId,photo} = req.body;

        //FIND THE BLOG THAT NEEDS TO BE UPDATED
        let blog;
        try{
             blog = await Blog.findOne({_id:blogId});
        }
        catch(error){
            return next(next);
        }

    //2.check if photo is empty or changed , if change then update photo ->  time => 4:20:00
        if(photo){ //if photo is being updated 
            const previousPhoto = blog.photopath;
           previousPhoto = previousPhoto.split('/').at(-1);
           //delete photo
           fs.unlinkSync(`storage/${previousPhoto}`);

           // now store the updated photo that was sent in a body 
           const buffer =  Buffer.from(photo.replace(/^data:image\/(png|jpg|ipeg);base64,/,''),'base64') //a. reading photo and replacing data URI i-e (data:image/png;base64,iVBORw0KGg...) with ->  empty string i-e '''

        //b. allot a random name
        const imagePath = `${Date.now()}-${author}.png`;
        //c. save locally 
        try{
            fs.writeFileSync(`storage/${imagePath}`,buffer);
        }
        catch(error){
            return next(error)
        }
         await Blog.updateOne({_id:blogId},{
            title,
            content,
            photopath:`${BACKEND_SERVER_PATH}/storage/${imagePath}`}
            );
        }
        else{
            await Blog.updateOne({_id:blogId}, //filter
                {title,content} //data
            );
        }
        res.status(200).json({message:'blog updated!'});

    },
    async delete(req,res,next){
       // 1. validate id
       const deleteBlogSchema = Joi.object({
        id:Joi.string().regex(mongodbIdPattern).required()
       })
       const {error} = deleteBlogSchema.validate(req.params);
       if(error){
        return next(error)
       }
       const {id} = req.params;
       try{
           //2. delete that particular blog
            await Blog.deleteOne({_id:id});
           //.3 delete comments related to that blog
            await Comment.deleteMany({blog:id});
            res.status(200).json({message:"Blog Deleted!"})
       }
       catch(error){
        return next(error)
       }
    }
}

module.exports = blogController;