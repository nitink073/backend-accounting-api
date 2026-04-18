const {body} = require("express-validator")

const customervalidation = [
    body("name")
    .notEmpty()
    .withMessage("name required"),

    body("email")
    .isEmail()
    .withMessage("valid email required"),

    body("phone")
    .isLength({min:10,max:10})
    .withMessage("phone must be 10 digits"),

    body("city")
    .notEmpty()
    .withMessage("city required")
]

module.exports = {customervalidation}