const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5001;
const bodyParser = require('body-parser');
const http = require('http');
const socketConfig = require('./socketConfig');

const fs = require('fs');
const userRoute = require('./routers/user.route')
const categoryRoute = require('./routers/category.route')
const recetteRoute = require('./routers/recette.route')
const uploadRoute = require('./routers/upload.route')

const app = express()
const server = http.createServer(app);

// Configurez Socket.IO
const io = socketConfig.configureSocketIO(server);

// ... autres configurations Express

// Passez l'instance io aux middleware ou aux routes qui en ont besoin
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors({
    origin: 'https://note-three-kappa.vercel.app', // Remplacez ceci par l'URL de votre client React
    credentials: true,
  }));
  
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

app.locals.io = io;
app.use("/api" ,userRoute)
app.use("/api" ,categoryRoute)
app.use("/api" ,recetteRoute)
app.use("/api",uploadRoute)
server.listen(PORT, ()=>{
    console.log(`server is running at PORT ${PORT}`)
}) 