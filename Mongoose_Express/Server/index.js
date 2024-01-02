const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors()) // cors
// getting-started.js
const mongoose = require('mongoose');

// Product 모델 요청
const Product = require('./models/product');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand'); // 마지막 부분이 DB명
    console.log("Mongo Connect Success")
}

// 삼품 조회
app.get('/products', async (req,res) => {
    const products = await Product.find({})
    console.log(products);
    res.send(products);
});

// 상품 상세 조회
app.get('/products/:id', async (req,res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    console.log(product);
    res.send(product);
});

// 상품 추가 (필요없을듯)
app.get("/product/new", async (req,res) =>{
    console.log("UPDATE PAGE");
});

// 상품 추가
app.post("/product/new", async (req,res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send("making your product");
}) ;


app.listen(4000, () =>{
    console.log("Success");
})