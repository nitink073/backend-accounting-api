const db = require("../db")

const getinvoice = async (req,res,next) =>{
   try{ 
    const {id} = req.params
    const [result] = await db.promise().query(
        "select * from invoices where id = ?",[id]
    )
    if(result.length === 0) {
        const error = new Error("invoice not found")
        error.status = 400
        throw error
    }
    res.json(result[0])
}
catch(err){
    next(err)
}
}
const updateinvoice = async (req,res,next) =>{
    try{
    const {id} = req.params
    const {payment_status} = req.body
    const [result] = await db.promise().query(
        "update invoices set payment_status =? where id =?",[payment_status,id]
    )
    if(result.affectedRows === 0){
        const error = new Error('invoice not found')
        error.status = 400
        throw error
    }
   res.json(result)
}
catch(err){
    next (err)
}
}
const createinvoice = async (req,res,next) =>{
    try{
      const { customer_id,invoice_date,total_amount,payment_status }= req.body
     const [result] = await db.promise().query(
        "insert into invoices (customer_id,invoice_date,total_amount,payment_status)values(?,?,?,?)",
       [customer_id,invoice_date,total_amount,payment_status]
     )
     
     res.json({
        success:true,
        message:result.insertId
     })
}
   
    catch(err){
        next(err)
    }
}
const deleteinvoice = async (req,res,next) =>{
    try{
    const {id} = req.params
    const [result] = await db.promise().query(
        "delete from invoices where id =?",[id]
    )
   if(result.affectedRows === 0){
   const error = new Error("invoice doesn't exist")
   error.status = 400
   throw error
   }
  res.json({
    success:true,   
    message:"invoice deleted successfully"
  })
}
catch(err){
    next(err)
}
}
const getinvoices = async (req,res,next) =>{
    try{
        const {payment_status} = req.query

        let query = "select * from invoices"
        let values = []

        if(payment_status){
            query += " where payment_status =?"
            values.push(payment_status)
        }
        const [result] = await db.promise().query(query,values)

        res.json({
            success:true,
            message:result
        })
    }
    catch(err){
        next(err)
    }
}
const getcustomerbyid = async (req,res,next) =>{
      try{
    const {customer_id} = req.query
    let query = "select * from invoices"
    let values =[]
    
    if(customer_id){
        query +=" where customer_id =?"
        values.push(customer_id)
    }
    const [result] = await db.promise().query(query,values)

    res.json({
        success:true,
        message:result
    })
      }
   catch(err){
    next(err)
   }
}
const totalamount = async (req,res,next) =>{
    try{
      const {total_amount} = req.query
      let query = "select * from invoices"
      let values = []
      
      if(total_amount) {
        query += " where total_amount > ?"
        values.push(total_amount)
      }
      const [result] = await db.promise().query(query,values)
        res.json({
           success:true,
          message:result
        })
    }
    catch(err){
        next(err)
    }
}
const getinvoicesbypage = async (req,res,next) =>{
    try{        
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5

        const offset = (page-1) * limit

        const [result] = await db.promise().query("select * from invoices limit ? offset ?",
            [limit,offset]
        )
                console.log(result)

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

const getinvoiceswithcustomer = async (req,res,next) =>{
    try{
      const [result] = await db.promise().query
      ("select invoices.*,customers.name from invoices join customers on invoices.customer_id = customers.id")
    
    res.json({
     success:true,
     message:result
    })
}
    catch(err){
        next(err)
    }

}
const getcustomerwithphone = async(req,res,next) =>{
    try{
        const {payment_status} = req.query
        const [result] = await db.promise().query
        (`select customers.name, customers.phone from invoices join customers on invoices.customer_id = customers.id where payment_status = ?`,[payment_status])
        
        res.json({
            success:true,
            message:result
        })
    }
    catch(err){
        next(err)
    }
}
module.exports = {getinvoice,updateinvoice,createinvoice,deleteinvoice,getinvoices,getcustomerbyid,totalamount,getinvoicesbypage,getinvoiceswithcustomer,getcustomerwithphone}