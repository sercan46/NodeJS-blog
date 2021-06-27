const jwt=require('jsonwebtoken')
const User=require('../models/users')
const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt
    if(token){
        jwt.verify(token,'gizli kelime',(err,decodedToken)=>{
            if(err){
                console.log(err);
                res.redirect('/login')
            }else{
                next();
            }
        })
    }
    else{
        res.redirect('/login')
    }
}
const chechkUser=(req,res,next)=>{
    const token=req.cookies.jwt
    if(token){
        jwt.verify(token,'gizli kelime',async (err,decodedToken)=>{
            if(err){
                console.log(err);
                res.locals.user=null
            }else{
                let user=await User.findById(decodedToken.id)
                res.locals.user=user
                next();
            }
        })
    }
    else{
        res.locals.user=null
        next();
    }
}
module.exports={requireAuth,chechkUser};