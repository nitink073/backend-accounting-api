const { body } = require("express-validator")

const invoicevalidation = [
    body("customer_id")
    .isInt()
    .withMessage("customer id must be number"),

    body("amount")
    .isNumeric()
    .withMessage("amount must be numeric"),

    body("status")
    .isEmpty()
    .withMessage("status required")
]
module.exports = {invoicevalidation}