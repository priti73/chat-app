const Chat = require('../models/chat');



exports.chat=async (req,res,next)=>{
    try{
       console.log("message",req.body.text);
       console.log("id",req.user.id);
       await Chat.create({
        message:req.body.text,
        signupId:req.user.id,

     })
     res.status(201).json({message: 'Succesfully sent text'});
   

    }
    catch(err){
        res.status(500).json({message: err, success:false})
      }
}