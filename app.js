require("dotenv").config()
const swaggerUi = require ("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")
const rateLimit = require ("express-rate-limit")
const limiter = rateLimit({
    windowMs:15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests
    message: "too many requests, please try again later"
})

// app.use(limiter)
const express = require('express')
const morgan = require("morgan")
const paymentroutes= require("./routes/paymentroute")
const authRoute = require("./routes/authRoute")
const customerroutes = require('./routes/customerroute')
const invoiceroutes =require('./routes/invoiceroute')
const helmet = require("helmet")
const uploadroute = require("./uploads/uploadroute")
const cors = require("cors")

const errorhandler = require('./errorhandler/errorhandler')
// const validatedinvoice = require('./middleware/validateinvoice')
console.log(process.env.DB_NAME)
console.log(process.env.JWT_SECRET)
const app = express()
app.use(morgan("dev"))
app.use(express.json())
const options = {
 definition: {
  openapi: "3.0.0",
  info: {
   title: "Accounting System API",
   version: "1.0.0",
   description: "API documentation for accounting system backend"
  },
  servers: [
   {
    url: "http://localhost:3000"
   }
  ]
 },
 apis: ["./routes/*.js"]
}
console.log("customer route loaded")
const swaggerSpec = swaggerJsdoc(options)
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use("/payments",paymentroutes)
app.use("/api",authRoute)
app.use("/customers",customerroutes)
app.use("/invoices",invoiceroutes)
app.use(helmet())
app.use(cors())
app.use("/api",uploadroute)
app.use("/uploads",express.static("uploads"))
// app.use(validatedinvoice)
app.use(errorhandler)
app.listen(process.env.PORT,()=>{
    console.log("server is running on port 3000",process.env.PORT)
})

module.exports = app;