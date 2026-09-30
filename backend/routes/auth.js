import express from 'express'; import bcrypt from 'bcryptjs'; import jwt from 'jsonwebtoken'; import User from '../models/User.js'; import {auth} from '../middleware/auth.js';
const r=express.Router();
const token=u=>jwt.sign({id:u._id.toString(),name:u.name,email:u.email,role:u.role},process.env.JWT_SECRET,{expiresIn:'7d'});
r.post('/register',async(req,res)=>{try{const {name,email,password}=req.body;if(!name||!email||!password||password.length<6)return res.status(400).json({message:'Name, email and 6+ character password are required'});if(await User.findOne({email}))return res.status(409).json({message:'Email already registered'});const u=await User.create({name,email,password:await bcrypt.hash(password,10)});res.status(201).json({token:token(u),user:{id:u._id,name:u.name,email:u.email,role:u.role}})}catch(e){res.status(500).json({message:e.message})}});
r.post('/login',async(req,res)=>{try{const {email,password}=req.body,u=await User.findOne({email});if(!u||!(await bcrypt.compare(password,u.password)))return res.status(401).json({message:'Invalid email or password'});res.json({token:token(u),user:{id:u._id,name:u.name,email:u.email,role:u.role}})}catch(e){res.status(500).json({message:e.message})}});
r.get('/me',auth,async(req,res)=>{const u=await User.findById(req.user.id).select('-password');res.json({user:u})});
r.put('/me',auth,async(req,res)=>{const {name,phone,address}=req.body;const u=await User.findByIdAndUpdate(req.user.id,{name,phone,address},{new:true}).select('-password');res.json({user:u})});
export default r;
