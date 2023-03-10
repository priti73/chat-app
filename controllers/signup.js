const user = require('../models/signup');
const bcrypt=require('bcrypt');

function validatestring(string){
   if(string==undefined || string.length===0)
    return true;
    else {
      return false;
    }
}

exports.signup= async(req,res,next)=>{
    try{
       const {name,email,password,Phonenumber }=req.body
       if(validatestring(name) || validatestring(email) 
       || validatestring(password) || validatestring(Phonenumber)){
         return res.status(400).json({error:"ALL feilds are required"})
       }
       const signupuser=await user.findAll({where : {email}})
       if(signupuser.length>0){
         console.log(signupuser);
         res.status(401).json({ message:'User already exists, Please Login'});
      }
      else{
       const saltrounds=10;
       bcrypt.hash(password,saltrounds, async(err,hash)=>{
        console.log(err);
         await user.create({
            name,
            email,
            Phonenumber,
            password: hash
         })
         res.status(201).json({message: 'Succesfully signup'});
       })
      }
      }
      
    catch(err){
       res.status(500).json({
          error: err
       })
    }
 }