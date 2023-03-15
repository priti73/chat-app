
const User_group = require('../models/user_group');

exports.getgroupuser=async (req,res,next)=>{
    try{
        const grpusers=await User_group.findAll({where:{groupId:req.query.groupid}});
        res.status(201).json({message: 'Succesfully sent  grptext',grpusers:grpusers});
      }     
    catch(err){
      console.log("err>>>>>>>>>>>>>>>>",err);
       res.status(500).json({
          error: err
       })
    }
 }