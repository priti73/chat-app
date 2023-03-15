const path= require('path');

const express=require('express');
const grpcontroller=require('../controllers/groupchat');

const router=express.Router();

router.get('/groupusers/getname',grpcontroller.getgroupuser);
module.exports=router;
