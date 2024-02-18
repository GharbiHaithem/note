const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const fs = require('fs');
const userRoute = require('./routers/user.route')
const categoryRoute = require('./routers/category.route')
const recetteRoute = require('./routers/recette.route')

const app = express()
app.use(cors({
    origin:"*",
   
    credentials:true
}))
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
mongoose.connect(
    process.env.MONGO_URI , 
       
    
)
.then(()=>{

 
    console.log(`database connected succseffuly`)
}) 
.catch((err)=>{
    console.log(`error connexion in database ${err}`)
})
app.use("/api" ,userRoute)
app.use("/api" ,categoryRoute)
app.use("/api" ,recetteRoute)

app.listen(PORT, ()=>{
    console.log(`server is running at PORT ${PORT}`)
}) 