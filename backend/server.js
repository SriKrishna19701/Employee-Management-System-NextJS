const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./schema/connectDB');
require('dotenv').config;

app.use(cors());

connectDB();

app.get('/',(req,res)=>{
    res.json({message:"Health OK"})
});
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Listening on Port ${PORT}`)
})
.catch((err)=>{
    console.log(`Error While Connecting ${PORT}`);
});


