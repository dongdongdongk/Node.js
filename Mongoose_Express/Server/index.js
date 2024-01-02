const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors()) // cors
// getting-started.js
const mongoose = require('mongoose');

// Product �� ��û
const Product = require('./models/product');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand'); // ������ �κ��� DB��
    console.log("Mongo Connect Success")
}

// ��ǰ ��ȸ
app.get('/products', async (req,res) => {
    const products = await Product.find({})
    console.log(products);
    res.send(products);
});

// ��ǰ �� ��ȸ
app.get('/products/:id', async (req,res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    console.log(product);
    res.send(product);
});

// ��ǰ �߰� (�ʿ������)
app.get("/product/new", async (req,res) =>{
    console.log("UPDATE PAGE");
});

// ��ǰ �߰�
app.post("/product/new", async (req,res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send("making your product");
}) ;


app.listen(4000, () =>{
    console.log("Success");
})