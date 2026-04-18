const validatecreate = async (req,res,next) =>{

    const {customer_id,total_amount,invoice_date,payment_status} = req.body

    if(!customer_id){
        const error = new Error("customer_id is requires")
        error.status = 400
        return next (error)
    }
    if(total_amount <= 0){
        const error = new Error("amount must be greater than 0")
        error.status = 400
        return next (error)
    }
    if(!invoice_date){
        const error = new Error("invoice date is required")
        error.status = 400
        return next (error)
    }
    const today = new Date()
    const invoiceDate = new Date(invoice_date)

    if(invoiceDate < today){
        const error = new Error("invoice date cannot be in the past")
        error.status = 400
        return next(error)
    }
    if(!payment_status){
        const error = new Error("payment_status is required")
        error.status = 400
        return next(error)
    }
    next()
}

const {body,validationresult} = require("express-validator")

const validateregister = [
    body("email")
    .isEmail()
    .withMessage("valid email required"),

    body("password")
    .isLength({min:6})
    .withMessage("password must be atleast 6 characters")
]

module.exports  = validatecreate,validateregister