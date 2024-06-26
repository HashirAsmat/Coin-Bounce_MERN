// why we need config folder and index.js file ?--> Because To maintain Clean Code;
// fist we create .env file to secure our confidential data and hide it by declaring environment variables for them , now inorder to use those environment variable in their respective position to replace data ,we can import them directly to the server.js file and other file but we dont usually import them diretly because importing from .env file require some extra steps which make the code looks not very clean bcx we have to write process.env with every variable so to avoid this , so we first import them here .

 const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const BACKEND_SERVER_PATH = process.env.BACKEND_SERVER_PATH;

module.exports = {
    PORT,
    MONGODB_CONNECTION_STRING,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    BACKEND_SERVER_PATH
}


// dotenv Package: 
//The dotenv package is used to load environment variables from the .env file into your Node.js application's environment. 
// This is done by calling dotenv.config(). 
//When you call this function i-e dotenv.config() , it reads the .env file and sets the variables in the process.env object.
//process.env is an object by nature.