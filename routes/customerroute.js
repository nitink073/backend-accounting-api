const express = require('express')
const { getcustomer, updatecustomer, deletecustomer, createcustomer, getallcustomers, getcustomerpagination, searchcustomer } = require('../controller/customercontroller')
const authmiddleware = require('../middleware/authMiddleware')
const { customervalidation } = require('../validators/customervalidator')
const authMiddleware = require('../middleware/authMiddleware')
const { authorizeroles } = require('../middleware/rolemiddleware')
// const upload = require('../uploads/uploadmiddleware')
// const uploadcontroller = require('../uploads/uploadcontroller')
const router = express.Router()

// router.post("/upload",upload.single("image"),uploadcontroller)
router.get('/',searchcustomer)
router.get('/',getcustomerpagination)
router.get('/customers',authmiddleware,getcustomer)
router.get('/:id',getcustomer)
router.put('/:id',updatecustomer)
router.delete('/:id',deletecustomer)
/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created successfully
 */
router.post('/',createcustomer,customervalidation)
/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Customers fetched successfully
 */
router.get('/customers',getallcustomers)
router.delete("/:id",authMiddleware,authorizeroles("admin"),deletecustomer)
module.exports = router