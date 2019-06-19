const express=require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Products = require('../models/products');

//to retreive all product
router.get('/',(req,res,next)=>{
    //dumy data
// res.status(200).json({
// message:'handling GET requests to /product'
// });

//Products.find()- find all products** find().limit()-> giving limits to query ** and there ara more
Products.find()//retrieve all  products
.select('name price _id')//give the fields you want retrieve in response
.exec()
.then(docs=>{
    const response={
        count:docs.length,
        product:docs.map(doc=>{
            return{
                name:doc.name,
                price:doc.price,
                _id:doc._id,
                request:{//meta information
                    type:'GET',
                    url:'http://localhost:3000/product/'+doc._id
                }
            }
        })
    }
    if(docs.length >0) {
        res.status(200).json(response);
        //as the response give the all projects in json
        //if we want to go for a particular product copy the id and append it to the url
        //instead we can provide  a link to each entry in json for go inside that product by itself without appending the id for 
        //URI manually by us
        //that part is done in then {}
    }
    else{
        res.status(404).json({
            message:'no entry found'
        });
    }
})
.catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    });
});
});

router.post('/',(req,res,next)=>{
    //before using database*******************
    //creating a new product
    // const products={
    //     name:req.body.name,
    //     price:req.body.price
    // };

    //after using database******************
    // to store data we create an instance of the model
    //in here we use model as a constructer and inside that we pass a javascript object where we pass data for that model
    const products=new Products({
        _id:new mongoose.Types.ObjectId(),//construcyor function automatically create and give a new & unique id
        name:req.body.name,
        price:req.body.price
    });
    //save is a method provided by mongoose which you can use for mongoose models and save this data in the database
    products.save().then(result=>{
    console.log(result);
}).catch(err => console.log(err));

    res.status(200).json({
    message:'created product successfully',
    createdProduct:products //pass the products object which created in the previous step
    });
    });

    
    //to retrieve the product where the product id=productId
    router.get('/:productId', (req,res,next) => {
const id = req.params.productId;

//dumy code
// if(id === 'special'){
//     res.status(200).json({
//         message:'You discovered a special id',
//         id: id
        
//     });
// }
// else{
//     res.status(200).json({
//         message:'You passed an id',
//         id:id
//     });
// }
Products.findById(id)
.exec()
.then(doc => {
    console.log(doc);
    if(doc){//if doc is not null
        res.status(200).json(doc);//from .json(doc) i will send json data of document
    }
    else{
        res.status(404).json({message:'No valid entry found for provided Id'});
    }
    
})
.catch(err => {
    console.log(err);
    res.status(500).json({error:err});//set error property which catching in here   ** Invalid ID

});
    });

    //patch is use to whenever we want to change data /updating data in the database
    router.patch('/:productId',(req,res,next)=>{
        
             //dummy data
        // res.status(200).json({
        // message:'updated the product'
        // });
        //in here we pass s second argument mentioning how we are going to update using "$set" coming fom mongoose ang kive a key value
        //pair mentioning how to upadate our object
       
        const id = req.params.productId;
        //Products.update({_id:id},{$set: {name:req.body.newName, price:req.body.newPrice}})
        //if we give the update qyery like this we have to update all input parameters in our case name & price
        //to update one property 
        const updateOps={}//an object
        for(const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        Products.update({_id:id},{$set:updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
              error:err
            });
        });
        });

        router.delete('/:productId',(req,res,next)=>{
           
           //dummy data
            // res.status(200).json({
            // message:'deleted the product'
            // });
            const id = req.params.productId;
            Products.remove({_id:id})
            .exec()//execute the above statement
            .then(result => {
                res.status(200).json({result});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error:err
                });
            });
            });

    module.exports=router;