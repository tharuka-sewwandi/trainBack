const mongoose=require('mongoose');
const govSchema = mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
nic:{type:String,required:true}

});
module.exports=mongoose.model('Gov',govSchema);