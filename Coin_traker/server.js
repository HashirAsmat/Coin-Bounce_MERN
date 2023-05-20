const express = require("express");
const app = express();
//we are importing PORT from congif -> index file  (time- 1:00:00)
const {PORT} = require("./config/index");
const DB_connection = require("./Database/index");
const router = require("./routes/index");
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
//this router will execute on any type of request - get,post,put,del
app.use(cookieParser());
app.use(express.json());
app.use('/storage',express.static('storage'));
app.use(router);

DB_connection();



//time(1:39:00) we place error-handler middleware at the end bcz middleware run sequentially , we want our error handling functionality till the END of req-res Cycle , and when we send finilize response , we should have completed our error handling.
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})













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