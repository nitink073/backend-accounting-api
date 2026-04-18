const {body} = require("express-validator")

const registervalidation = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("name required"),

    body("email")
    .isEmail()
    .withMessage("valid email required"),

    body("password")
    .isLength({min:6})
    .withMessage("password must be atleast 6 characters")
]
const loginvalidation = [
    body("email")
    .isEmail()
    .withMessage("valid email required"),

    body("password")
    .notEmpty()
    .withMessage("password required")
]
module.exports = {registervalidation,loginvalidation}