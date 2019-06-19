const mongoose= require('mongoose');
const productSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    depatureStation:{type:String,required:true},
    depatureTime:{type:Number, required:true},
    arriveStation:{type:String,required:true},
    arriveTime:{type:Number, required:true},
    price:{type:Number, required:true}
   
    });
    module.exports = mongoose.model('Train', productSchema);