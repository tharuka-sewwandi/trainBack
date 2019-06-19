const mongoose= require('mongoose');
const bookresultSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    tname:{type:String,required:true},
    nic:{type:String,required:true},
    not:{type:Number, required:true},
    empType:{type:String,required:true},
    firstPrice:{type:Number, required:true},
    disountedPrice:{type:Number, required:true}
   
    });
    module.exports = mongoose.model('BookResult', bookresultSchema);