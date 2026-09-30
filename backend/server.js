import 'dotenv/config'; import express from 'express'; import cors from 'cors'; import mongoose from 'mongoose'; import auth from './routes/auth.js'; import products from './routes/products.js'; import orders from './routes/orders.js'; import Product from './models/Product.js'; import Order from './models/Order.js'; import User from './models/User.js';
const app=express();app.use(cors({origin:true,credentials:true}));app.use(express.json());
app.get('/api/health',(req,res)=>res.json({ok:true,service:'Thiranex API'}));app.use('/api/auth',auth);app.use('/api/products',products);app.use('/api/orders',orders);
app.get('/api/admin/stats',async(req,res)=>res.status(401).json({message:'Use admin dashboard authentication'}));
const port=process.env.PORT||5000;
mongoose.connect(process.env.MONGODB_URI).then(()=>{app.listen(port,()=>console.log(`Thiranex API running at http://localhost:${port}`));}).catch(e=>{console.error('MongoDB connection failed:',e.message);process.exit(1)});
