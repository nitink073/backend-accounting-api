const express = require("express")
const upload = require("./uploadmiddleware")
const { uploadphoto } = require("./uploadcontroller")
const router = express.Router()

router.post("/upload",upload.single("image"),uploadphoto)


module.exports = router