const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const auth = require('../middleware/auth');
const blogController = require("../controller/blogController");
const commentController = require('../controller/commentController');
const messageController = require("../controller/messageController");
//////////////user//////////////
//login
router.post("/login",authController.login);
//register
router.post("/register",authController.register);
//logout
router.post("/logout",auth,authController.logout);
//refresh
router.get("/refresh",authController.refresh);

//////////blog -> CRUD/////////////////
//create
router.post('/blog',auth,blogController.create);
//read all blogs
router.get('/blog/all',auth,blogController.getAll);
//read a blog filter by id
router.get('/blog/:id',auth,blogController.getById);
//update
router.put('/blog/update',auth,blogController.update);
//delete
router.delete('/blog/:id',auth,blogController.delete);


////////////comment/////////////////////
//create comment
router.post('/comment',auth,commentController.create);
//read comment by blog id
router.get('/comment/:id',auth,commentController.getById);

///////messages routes///////////
//create new message
router.post('/messages/new',auth,messageController.create);
//get all messages
router.get('/messages/all',auth,messageController.getAll);

////favoriteApi/////
router.post('/favoriteCurrency',auth,blogController.addFavorite);
router.post('/AllfavoriteCurrency',auth,blogController.getAllFavorite);
module.exports = router;







