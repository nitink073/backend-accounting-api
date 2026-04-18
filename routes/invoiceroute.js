const express = require ('express')
const { getinvoice, updateinvoice, createinvoice, deleteinvoice, getinvoices, getcustomerbyid, totalamount, getinvoicesbypage, getinvoiceswithcustomer, getcustomerwithphone } = require('../controller/invoicecontroller')
const validatedinvoice = require('../middleware/validateinvoice')
const validatecreate = require('../middleware/validatecreate')
const validatedelete = require('../middleware/validatedelete')
const authmiddleware = require('../middleware/authMiddleware')
const { invoicevalidation } = require('../validators/invoicevalidator')

const router =express.Router()
router.get("/",getinvoicesbypage)
/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: List of invoices
 */
router.get("/:id",validatedinvoice,getinvoice)  
router.get("/",authmiddleware,getinvoice)
router.get("/",getcustomerwithphone)
router.get("/",getinvoiceswithcustomer)
router.get("/",totalamount)
router.get("/",getcustomerbyid)
router.get("/",getinvoices)
router.delete("/:id",deleteinvoice,validatedelete)
/**
 * @swagger
 * /invoices:
 *   post:
 *     summary: Create invoice
 *     tags: [Invoices]
 *     responses:
 *       201:
 *         description: Invoice created
 */
router.post("/invoice",createinvoice,validatecreate,invoicevalidation)
router.put("/:id",updateinvoice,validatedinvoice)
module.exports = router