const {ValidationError} = require('joi');


const errorHandler = (error,req,res,next)=>{
//default error
let status = 500;
let data = {
    message:"internal server Error"
}

//check if error is validation error
if(error instanceof ValidationError){
    status = 401;
    data.message = error.message;
    return res.status(status).json(data)

}

//if error is other than validation Error
if(error.status){
    data.status = error.status;
}  
if(error.message){
    data.message = error.message;
}
return res.status(status).json(data);
}

module.exports = errorHandler;