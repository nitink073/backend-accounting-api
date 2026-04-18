const jwt = require("jsonwebtoken")

const secret_key = "secretkey"

const authMiddleware = async(req,res,next) =>{

   const authHeader = req.headers.authorization
   if(!authHeader) {
    return res.status(401).json({message:"token required"})
   }
   const token = authHeader.split(" ")[1]
   try{
    const decoded = jwt.verify(token,"secretkey")
    
    req.user = decoded
         console.log(req.user)

    next()
   }
   catch(err){
    return res.status(401).json({message:"invalid token"})
   }
}
module.exports = authMiddleware