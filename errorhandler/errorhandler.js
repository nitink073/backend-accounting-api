const errorhandler = (err,req,res,next) =>{
    console.error(err)

    res.status(err.status || 500).json({
        success:false,
        error:{
            message:err.message,
            status:err.status || 500    
        }
    })
}

module.exports = errorhandler