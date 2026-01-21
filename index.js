const { configDotenv } = require('dotenv');
const mongoose = require('mongoose');
const db=require('./utils/db');
const express = require('express');
const app =express();
configDotenv()
db()

const PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("Hello World");
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

