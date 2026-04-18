const express = require ("express")
const authMiddleware = require("../middleware/authMiddleware")
const { authorizeroles } = require("../middleware/rolemiddleware")
const { createpayment } = require("../services/paymentservice")
const router = express.Router()
/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create payment
 *     tags: [Payments]
 *     responses:
 *       201:
 *         description: Payment recorded successfully
 */
router.post("/",authMiddleware,authorizeroles("admin"),createpayment)

module.exports = router