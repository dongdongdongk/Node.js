const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ShopApp'); 
    console.log("ConnectSuccess")
};


const personSchema = new mongoose.Schema({
    first : String,
    last : String 
})

personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`
})

const Person = mongoose.model('Person',personSchema);