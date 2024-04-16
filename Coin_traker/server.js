const express = require("express");
const cors = require('cors');
const app = express();
//we are importing PORT from congif -> index file  (time- 1:00:00)
const {PORT} = require("./config/index");
const DB_connection = require("./Database/index");
const router = require("./routes/index");
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');

const corsOptions = {
    credentials:true,
    origin: ['http://localhost:3000']  //cross origin resource sharing , it is used when the front end or client side and the backend i-e server side does not exist on the same origin , origin mean computer or server. normally when we are developing an app both exists on same origins the client can simply get all the resources from the server bcz it's local host but when we are dealing with hosting , we sometimes host the backend on different server computer and frontend on different , so both gets different origins, without CORS it's not allowed to share resources across different origins because of security prupose...
}


//middlewares 
app.use(cookieParser());
app.use(express.json({limit:'50mb'})); // 
app.use(cors(corsOptions));
app.use('/storage',express.static('storage'));


//DB connection
DB_connection();

//this router will execute on any type of request - get,post,put,del
//route handler
app.use(router);  

//the route handler have specific routes, having specific controllers function , 
//those controller function have 3 arguments i-e function(req,res,next) , 
//they are capable of returning an error object to the middleware that has been defined below that , 
//but that middleware must have 4 arguments  (error, req, res, next) , 
//here the first argument i-e error,  among the 4 arguments accept the error object from the previous middleware.

//time(1:39:00) we place error-handler middleware at the end bcz middleware run sequentially ,
// we want our error handling functionality till the END of req-res Cycle , and when we send finilize response ,
// we should have completed our error handling.
app.use(errorHandler);


app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})


//--------- for front end pusher code (whatsapp clone-clever programmer) Time => 3:19:00










/// HOW To FETCH DATA FROM EXTERNAL API IN NODE USING "AXIOS"

//const axios = require("axios");
// app.get("/api", async (req,res)=>{
// try{
//     const response = await axios({
//         url:"https://swapi.dev/api/planets/1/",
//         method:"get"
// }) 
// 
//axios give response in json() formate already so we dont need to convert it to json , also it depends on API if is delivering data to u into json() or not..
// const data = response.data;
// res.send({data});
// }
// catch(err){
// console.log(err.message)
// }
// })


/////////////////////////////////////////
// REFERENCE VIDEO (MERN STACK FULL _ AZAD CHAI WALA - for this whole proj