const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ShopApp'); 
    console.log("ConnectSuccess")
};

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true, // 값이 필수적임
        maxlength : 20
    },
    price : {
        type : Number,
        required : true,
        min : 0
    },
    onSale : {
        type : Boolean,
        default : false
    },
    categories : [String],
    gty : {
        online : {
            type : Number,
            default : 0
        },
        inStore : {
            type : Number,
            default : 0
        }
    } 
});


const Product = mongoose.model('Product', productSchema); //  모델 정의 

const bike = new Product({name : 'Bike Helmet', price : 455, categories : ['Cycling', 'Safety']}); // 상품 생성 및 저장

bike.save()
    .then(data =>{
        console.log("Success"); 
        console.log(data);
    })
    .catch(err =>{
        console.log("error")
        console.log(err.errors.name.properties.message)
    });