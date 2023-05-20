const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET }= require('../config/index');
const {REFRESH_TOKEN_SECRET }= require('../config/index');
const tokenModel = require('../models/token');
//time -> 2:47:10

class JWTService{
    //sign access token
   static signAccessToken(payload,expiryTime){
 
        // it will create and return a jwt token
        return jwt.sign(payload,ACCESS_TOKEN_SECRET,{expiresIn: expiryTime});
    }

    //sign refresh token
   static signRefreshToken(payload,expiryTime){
        return jwt.sign(payload,REFRESH_TOKEN_SECRET,{expiresIn: expiryTime});
    }
    //verfiy access token
   static verifyAccessToken(token){
        return jwt.verify(token,ACCESS_TOKEN_SECRET); //jwt.verify return aan object that contain payload i-e in our case as a key.
    }
    //verify refresh token
    static  verifyRefreshToken(token){
        return jwt.verify(token,REFRESH_TOKEN_SECRET)
    }
    //store refresh token
    static async storeRefreshToken(token,userId){

        try{
           const newtoken =   new tokenModel({
                token,
                userId:userId,
            })            
             //store in DB
        await newtoken.save();
        }
        catch(error){
        console.log(error);
        }
    }

}
module.exports = JWTService;