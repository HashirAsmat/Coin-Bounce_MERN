const JWTService = require("../services/jwtService");
const User = require('../models/user');
const UserDTO = require('../dto/user');
const auth = async (req,res,next)=>{
    try{
    //1.refresh and access token validation
    const {refreshToken, accessToken} = req.cookies;
   
    if (!refreshToken || !accessToken){
        const error = {
            status:401,
            message:"Unauthorized"
        }
        return next(error);
    } 
    // verifyAccessToken will return that particular payload that has been passed during signing/generating the token , in our case . our payload was "_id"
    const _id = JWTService.verifyAccessToken(accessToken)._id;
    const user = await User.findOne({_id:_id});
    if (!user){
        const error = {
            status:401,
            message:'invalid token'
        }
        return next(error);
    }
    const userDTO = new UserDTO(user);
    req.user = userDTO;
    next();
    }
    catch(error){
        return next(error); //the error middleware function i-e errorHandler has 4 argument, i-e errorHandler = (error,req,res,next) , notice here the error is the argument where the errorHandler accept argument from next(error) or that has been passed to the next so in this case I guess that request will be forwarded to the particular middleware function where the middleware function could accept the error argument,   
}}
module.exports = auth;