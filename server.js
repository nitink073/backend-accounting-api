const app = require("./app")

// app.listen(3000, ()=>{
//  console.log("server running on port 3000")
// })
app.listen(process.env.PORT,()=>{
    console.log("server running on port",process.env.PORT)
})