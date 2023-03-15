const jwt=require('jsonwebtoken');
const User=require('../models/signup');

exports.authenticate=(req,res,next)=>{
 try{
    const token=req.header('Authentication');
    const user=jwt.verify(token,process.env.JWT_SECRET_KEY);
    User.findByPk(user.userid).then(user=>{
        req.user=user;
        next();
        }).catch(err=>{
            throw new Error(err)
        })
 }
 catch (err){
    console.log(err);
    return res.status(401).json({success:false});

 }
}

