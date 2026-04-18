const db = require("../db")

const getcustomer = (req,res) =>{
    const {id} = req.query
    const sql = "select * from customers where city=?";

    db.query(sql,(err,results)=>{
        if(err){
            return res.status(500).json({message:err.message})
        } 
          return res.status(200).json(results)
    })
}
const updatecustomer = (req,res) =>{

    const {id}=req.params
    const {name}= req.body
    const sql = "update customers set name=? where id=?"
    db.query(sql,[name,id],(err,results)=>{
        if(err){
            return res.status(500).json({message:err.message})
        }
        if(results.affectedRows === 0){
            return res.status(404).json({message:'customer not found'})
        }
        return res.status(200).json(results)
    })
}
 
  const deletecustomer = (req,res) =>{
   const {id} = req.params
   const sql = "delete from customers where id = ?"
   db.query(sql,[id],(err,results)=>{
    if(err){
        return res.status(500).json({message:err.message})
    } if(results.affectedRows === 0){
        return res.status(404).json({message:'customer not found'})
    }
    return res.status(200).json({message:'customer deleted successfully'})
   })

  }
 
  const createcustomer = (req,res) =>{
    
    const {name,phone,email,city}= req.body

    if (!name || !phone){
        return res.status(400).json({
            message:'name and phone are required'
        })
    }

    const sql = "insert into customers (name,phone,email,city)values(?,?,?,?)"
    db.query (sql,[name,phone,email,city],(err,results)=>{
      if(err){
        return res.status(500).json({message:err.message})
      } 
      if(results.affectedRows === 0){
        return res.status(404).json({message:'customer not found'})
      }
      return res.status(200).json({message:'customer created successfully'})
    })
  }
  const getallcustomers = (req,res) =>{
    const sql = "select * from customers"
    
    db.query(sql,(err,results)=>{
        if(err){
            return res.status(500).json({message:err.message})
        }
        res.status(200).json(results)
    })
  }
  const getcustomerpagination = async (req,res,next) =>{
    try{
    const page = parseInt(req.query.page) ||1   
    const limit = parseInt(req.query.limit) ||20
    const city = req.query.city
    const offset = (page-1) * limit
    const [result] = await db.promise().query("select * from customers limit ?  offset ?",
        [limit,offset]
    )
    
    res.json({
        success:true,
        page,
        limit,
        data:result
    })
  }
  catch(err){
   next(err)
  }
}
const searchcustomer = async(req,res,next) =>{
   try{
     const page = parseInt(req.query.page) ||1
     const limit = parseInt(req.query.limit)||5
     const search = req.query.search
    //  const sort = req.query.sort || "id"
    const city = req.query.city
    
    const allowedsort = ["id","name","phone","email","city","created_at"]
    const sort = allowedsort.includes(req.query.sort)? req.query.sort:"id"
     const offset = (page - 1) * limit
    let query = "select * from customers"
    let params = []
    let conditions =[]
    
    if(search){
        query += " where name like ? or email like ?"
        params.push(`%${search}%`,`%${search}%`)
    }
    query  +=` order by ${sort} ASC`

    query += " limit ? offset ?"
    params.push(limit,offset)
    const [result] = await db.promise().query(query,params)

    res.json(result)
   }
   catch(err){
    next(err)
   }
}

module.exports = {getcustomer,updatecustomer,deletecustomer,createcustomer,getallcustomers,getcustomerpagination,searchcustomer}