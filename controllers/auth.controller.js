const express = require('express');
const mongooose = require('mongoose');
const user=require('../models/user.model');
const login=async(req,res)=>{
    const {email,password}=req.body;
    const user=await user.findOne({email});
    if(!user){
        return res.status(400).json({message:"user with this email does not  found "})

    }




}
const register=async(req,res)=>{
    const {fullName,email,password,role}=req.body;
    const existingUser=await user.findOne({
        email
    })
    if(existingUser){
        return res.status(400).json({message:"user with this email already exists"})
    }
    


}

module.exports={login,register};
