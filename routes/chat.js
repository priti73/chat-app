const path= require('path');

const express=require('express');
const chatcontroller=require('../controllers/chat');
const auntheticateController=require('../middleware/auth');

const router=express.Router();


router.get('/users/chat',chatcontroller.getchat);
router.post('/users/chat',auntheticateController.authenticate,chatcontroller.postchat);

module.exports=router;
