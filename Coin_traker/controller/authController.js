const Joi = require ("joi");
const User = require("../models/user");
const tokenModel =require('../models/token'); 
const bcrypt = require("bcryptjs");
const UserDTO = require('../dto/user');
const JWTService = require('../services/jwtService');

//Minimum eight characters, at least one letter and one number:
const passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';



const authController = {
    async  register(req,res,next){
        
        //user register schema
        const userRegisterSchema = Joi.object({
            username:Joi.string().min(4).max(30).required(),
            name:Joi.string().max(30).required(),
            email:Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp(passwordPattern)).required(),
            confirmPassword: Joi.ref('password')
    }); 
        // time:1:32:00
        //1.validate user input
        const error = userRegisterSchema.validate(req.body).error;
        
        //2.if error in validation -> return error via middleware
        if(error){
            return next(error);
            //next will call the next middleware right below app.use(router);
        }

        //3.if email or username is already registered -> return an error
        const {username,name,email,password} = req.body;
        
        //check if email is already register
        try{
            const emailInUse = await User.exists({email});
            const usernameInUse = await User.exists({username});
           
            if (emailInUse){
                const error ={
                    status:409,
                    message:"Email already registered , Use another Email:"
                }
                return next(error);
            };
            if (usernameInUse){
                const error ={
                    status:409,
                    message:"userName not available, Use another UserName:"
                }
                return next(error);
                };
            } 
            catch(error){
                return next(error);
            }

            //4.password Hashing
            const hashedPassword = await bcrypt.hash(password,10);


            //5.store user in dataBase
            
            try{
                const userToRegister = new User({
                    username,
                    name,
                    email,
                    password:hashedPassword
                });
    
                const user = await userToRegister.save();
                
                //Token generation - jwt concepts time -> 2:20:00
                let accessToken;
                let refreshToken;

                accessToken = JWTService.signAccessToken({
                    _id:user._id,
                }, '30m');

                refreshToken = JWTService.signRefreshToken({
                    _id:user._id,
                },'60m');

                //store refresh token in DB
                await JWTService.storeRefreshToken(refreshToken,user._id);

             //send token as cookie   
             res.cookie('accessToken',accessToken,{
                maxAge:1000*60*60*24,
                httpOnly:true,//for security purpose , to prevent XSS attack
             }); 

             res.cookie('refreshToken',refreshToken,{
                maxAge:1000*60*60*24,
                httpOnly:true
             })  
            //6.response
             const userDTO = new UserDTO(user)
             return res.status(201).json({user:userDTO, auth:true}); // why auth:true ? -> 3:08:00
            }
            catch(error){
                return next(error)
            }

        },

        //ALWAYS WRITE SUCH ALGORITHM FOR YOURSELF IN FUNCTION.

        //1 define validation schema 
        //2 validate the body
        //3 if validation error , return the error through middleware
        //4 check the user name in User collection , if present return error
        //5 check the email if same return error , then the user should enter a different email 
        //6 if no match found then hash the password and make the new User object
        //7 save the user in database i-e user.save
        //8 now when we have confirm user , he will logged in right after he create an account,
        //9 so we have to create jwt tokens for user.
        //10 send the jwt token in cookies.
        //11 In the last send the userDTO object as a response.



        async login(req,res,next){
            //1.validate user input - we expect input data to be in such shape or structure
            const userloginSchema = Joi.object({
                username:Joi.string().min(4).max(30).required(),
                password: Joi.string().pattern(new RegExp(passwordPattern)).required(),
            });
            const error = userloginSchema.validate(req.body).error;
            //2.if error return error
            if(error){
                return next(error);
            }
            
            try{
            //3. if not validation error then retrieve the data from request body
            const {username,password} = req.body;
            
            //4. Match the username in Database
             const user = await User.findOne({
            username,
            })
            if(!user){
                const error = {
                    status:401,
                    message:"invalid username"
                }
                return next(error)
            }
            //5.match the password 
            const match =await bcrypt.compare(password,user.password);
            if(!match){
                const error = {
                    status:401,
                    message:"invalid password"
                }
                return next(error)
            }

            //generate Tokens
           const accessToken = JWTService.signAccessToken({
                _id:user._id,
            }, '30m');
            
            const refreshToken = JWTService.signRefreshToken({
               _id:user._id, 
            },'60m');

            //update refresh Token in DB -> time 3:00:00
            try{
            await tokenModel.updateOne({ _id:user.id,},
                {token:refreshToken},
                {upsert:true}
                );
            }
            catch(error){
                return next(error)
            }
            //send token as cookie in resp
             res.cookie('accessToken',accessToken,{
                maxAge:1000*60*60*24,
                httpOnly:true,
             });

             res.cookie('refreshToken',refreshToken,{
                maxAge:1000*60*60*24,
                httpOnly:true,
             });
            //if correct username and password  return user data as response, 
             //time:2:14:00 DTO concept -> data transfer Object , it is useful when we want to send some specific of user to the front end , but not whole user as an object

           const userDTO = new UserDTO(user)
            return res.status(200).json({user:userDTO,auth:true});
             
            }
            catch(error){
            return next(error);
            }

        },
     

        async logout(req,res,next){

         //1.delete refresh token
            const {refreshToken} = req.cookies;
            try{     //we have created a collection for refreshToken and its model name is tokenModel ->
            await tokenModel.deleteOne({token:refreshToken})
            
            //clear cookies
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');

            //send user null as response hence logout
            res.status(200).json({user:null, auth:false });
         }
        
            catch(error){
            return next(error);
         }
         
        },

        async refresh(req,res,next){
            //1. retrieve Refresh token from cookie
            console.log("refresh function working");
            const originalRefreshToken = req.cookies.refreshToken;
           
            let _id;
            try{
             _id = JWTService.verifyRefreshToken(originalRefreshToken)._id;    
            }
            catch(err){
                const error = {
                    status:401,
                    message:"unauthorized"
                }
                return next(error);
            }
            //2. verify Refresh token 
            try{
                const match = await tokenModel.findOne({_id:_id,token:originalRefreshToken})
                if(!match){
                    const error = {
                        status:401,
                        message:"unauthorized"
                    }
                    return next(error);
                }

           
            //3. generate new tokens
                const accessToken = JWTService.signAccessToken({_id:_id},'30m');
                const refreshToken = JWTService.signRefreshToken({_id:_id},'60m');

            //4. update database
                const updatetoken = await tokenModel.updateOne({_id:_id},{token:refreshToken})

            //5. also update cookies
            res.cookie("accessToken",accessToken,{
                maxAge:1000*60*60*24,
                httpOnly:true,
            });
            res.cookie("refreshToken",refreshToken,{
                maxAge:1000*60*60*24,
                httpOnly:true,
            });
            const user = await User.findOne({_id:_id});
            const userDto = new UserDTO(user);
            res.status(200).json({user:userDto,auth:true});
        }
        catch(error){
            next(error);
        }
        }
    }
    

module.exports = authController;