const express = require('express');
const app = express();
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/movieApp'); // 마지막 부분이 DB명
    console.log("Mongo Connect Success")
}







app.listen(3000, () =>{
    console.log("Success");
})