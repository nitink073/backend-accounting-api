const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require ("../db")
const { validationResult } = require("express-validator")
// const {validationresult} = require("express-validator")
const registeruser = async (req,res,next) =>{
    try{
       const errors = validationResult(req)
       if(!errors.isEmpty()){
        return res.status(400).json({
        errors:errors.array()  
        })
       }
        const {name,email,password} = req.body

        const hashedPassword = await bcrypt.hash(password,10)

        const role = 'user' 

        await db.promise().query("insert into users (name,email,password,role)values(?,?,?,?)",[name,email,hashedPassword,role])
        res.status(201).json({
            message:"user registered successfully"
        })
        console.log(process.env.JWT_SECRET)
    }
    catch(err){
     next(err)
    }
  
}

// const secret_key = "secretkey"
const secret_key = process.env.JWT_SECRET
const loginuser = async (req,res,next) =>{

    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
        return res.status(400).json({
        errors:errors.array()
            })
        }
        const {email,password} = req.body
        const [result] = await db.promise().query("select * from users where email = ?",[email])

        if(result.length === 0){
            return res.status(401).json({message:"user not found"})
        }
        const user = result [0]

        const isMath = await bcrypt.compare(password,user.password)

        if(!isMath){
            return res.status(401).json({message:"invalid password"})
        }
      const token = jwt.sign(
            {userId:user.id},
             process.env.JWT_SECRET,
            secret_key,
            {expiresIn:"1h"}
        )
        res.json({
            message:"login successful",
            token:token
        })
    }
    catch(err){
        next(err)
    }
}   


module.exports = {loginuser,registeruser}