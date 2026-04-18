const validatedelete = async (req,res,next) =>{
    const {id} = req.params
    if(!id){
        const error = new Error ("invoice id required")
        error.status = 400
        return next(error)
    }
    if(isNaN(id)){
        const error = new Error("id must be a number")
        error.status = 400
        return next (error)
    }
    next()
}

module.exports = validatedelete