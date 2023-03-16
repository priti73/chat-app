const path= require('path');

const express=require('express');

const auntheticateController=require('../middleware/auth');
const grpcontroller=require('../controllers/groupchat');

const router=express.Router();

router.get('/groupusers/getname',grpcontroller.getgroupuser);

router.post('/group/removemember', auntheticateController.authenticate,grpcontroller.removeuser);
router.post('/group/makememberadmin', auntheticateController.authenticate,grpcontroller.makememberadmin);

module.exports=router;
