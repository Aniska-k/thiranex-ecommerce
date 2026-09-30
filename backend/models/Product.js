import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({name:{type:String,required:true},slug:{type:String,unique:true},description:String,category:{type:String,required:true},brand:String,price:{type:Number,required:true},compareAtPrice:Number,stock:{type:Number,default:0},images:[String],rating:{type:Number,default:4.5},reviewCount:{type:Number,default:0},tags:[String],featured:{type:Boolean,default:false},active:{type:Boolean,default:true}},{timestamps:true});
export default mongoose.model('Product',productSchema);
