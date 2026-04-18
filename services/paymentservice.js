const db = require("../db")
const createpayment = async(req,res,next) =>{
    const connection = await db.promise().getConnection()

    try{
        await connection.beginTransaction()

        const{invoice_id,amount,payment_mode} = req.body

        await connection.query(
            "insert into payments (invoice_id,amount,payment_mode) values(?,?,?)",[invoice_id,amount,payment_mode]
        )
        await connection.query(
            "update invoices set payment_status = 'paid' where id = ?",[invoice_id]
        )
        await connection.query(
            "update customers set balance = balance - ? where id = ?",[amount,req.user.userId]
        )
        await connection.commit()
        
        res.json({
            message:"payment successful"
        })
    }
    catch(err){
        await connection.rollback()
        next(err)
    } finally{
        connection.release()
    }
}
module.exports = {createpayment}