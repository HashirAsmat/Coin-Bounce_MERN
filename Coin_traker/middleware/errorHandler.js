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

//error is the recieving argument i.e here at 1st argument place among 4 arguments , it recieve the data from the previous middleware.
// In Express.js middleware functions, the standard order of arguments is (error, req, res, next):
// error: This argument holds the error object that is passed to the middleware function when an error occurs in any previous middleware or route handler.
// req: The request object.
// res: The response object.
// next: The function that triggers the next middleware or route handler.

// Express recognizes that a middleware function has error handling capabilities by checking if the function has four arguments.
// If you define a middleware function with these four arguments, Express will consider it as an error handling middleware.
// This middleware will only be executed when an error is passed to it through the next(error) function in the previous middleware or route handler.
// when we pass next() an argument -> and return the next(error) , the next pass that argument (error) data to the specific middleware that has 4 arguments (error, req, res, next) , and among the 4 argument the first argument is responsible to recieve the data from the next(error);