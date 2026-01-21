const { configDotenv } = require('dotenv');
const mongoose = require('mongoose');
const db=require('./utils/db');
const express = require('express');
const app =express();
const authRoutes=require('./routes/auth.route');
configDotenv()
db()

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(urlencoded({extended:true}))

app.use("/api/auth",authRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

