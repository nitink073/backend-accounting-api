const validatedinvoice = (req,res,next) => {
    // console.log("PARAMS:",req.params)
    const {id} = req.params
    if(!id){
    const error = new Error("invoice id required")
    error.status = 400
    return next(error)
    }
    if(isNaN(id)) {
        const error = new Error("id must be a number")
        error.status = 400
        return next(error)
    }   
    next()
}   
const validateupdateinvoice = (req,res,next) =>{
    const {payment_status} = req.body
    if(!payment_status) {
        const error = new Error ('payment_status is requires')
        error.status = 400
        return next(error)
    }
    const allowedstatus = ["pending","paid","cancelled"]
    if(!allowedstatus.includes(payment_status)){
        const error = new Error("invalid payment status")
        error.status = 400
        return next(error)
    }
   
    next()
}


module.exports = validatedinvoice,validateupdateinvoice