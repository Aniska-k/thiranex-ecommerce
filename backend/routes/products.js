import express from 'express'; import Product from '../models/Product.js'; import {auth,admin} from '../middleware/auth.js';
const r=express.Router();
r.get('/',async(req,res)=>{try{const {q,category,min,max,sort,featured}=req.query;const f={active:true};if(q)f.$or=[{name:new RegExp(q,'i')},{brand:new RegExp(q,'i')},{tags:new RegExp(q,'i')}];if(category&&category!=='All')f.category=category;if(min)f.price={$gte:Number(min),...(f.price||{})};if(max)f.price={...(f.price||{}),$lte:Number(max)};if(featured==='true')f.featured=true;let s='-createdAt';if(sort==='price_asc')s='price';if(sort==='price_desc')s='-price';if(sort==='rating')s='-rating';if(sort==='name')s='name';const products=await Product.find(f).sort(s);res.json({products,categories:await Product.distinct('category',{active:true})})}catch(e){res.status(500).json({message:e.message})}});
r.get('/:id',async(req,res)=>{const p=await Product.findOne({_id:req.params.id,active:true});if(!p)return res.status(404).json({message:'Product not found'});res.json({product:p})});
r.post('/',auth,admin,async(req,res)=>{try{const p=await Product.create(req.body);res.status(201).json({product:p})}catch(e){res.status(400).json({message:e.message})}});
r.put('/:id',auth,admin,async(req,res)=>{try{const p=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});res.json({product:p})}catch(e){res.status(400).json({message:e.message})}});
r.delete('/:id',auth,admin,async(req,res)=>{await Product.findByIdAndUpdate(req.params.id,{active:false});res.json({message:'Product removed'})});
export default r;
