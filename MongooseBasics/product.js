const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ShopApp'); 
    console.log("ConnectSuccess")
};

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    price : {
        type : Number
    }

});


const Product = mongoose.model('Product', productSchema);

const bike = new Product({price : 300});

bike.save()
    .then(data =>{
        console.log("¼º°ø"); 
    })
    .catch(err =>{
        console.log("error")
        console.log(err)
    });