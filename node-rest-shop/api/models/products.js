//this file is to define how products does look like in this application
const mongoose= require('mongoose');

//create a  schema
//under this shema i pass a javascript object to define my projects does look like
const productSchema = mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
name:{type:String,required:true},
price:{type:Number, required:true}
//inside{} we have given validations eventhough we send requests this will gives an errr 
//if we pass  string for price or 
//if we pass invalid object name(nameee instead name/ picefef instead price)
//if pass number for name
//
});

//model 1st argument model name use upper case as starting characters
//2nd scema
module.exports = mongoose.model('Products', productSchema);