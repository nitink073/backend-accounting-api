const uploadphoto = (req,res) =>{
    if(!req.file){
        return res.status(400).json({
            message:'no file uploaded'
        })
    }
    res.json({
        message:"photo uploaded successfully",
        file:req.file.filename,
        path:`/uploads/${req.file.filename}`
    })
}

module.exports = {uploadphoto}