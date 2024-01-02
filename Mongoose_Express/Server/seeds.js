const mongoose = require('mongoose');
const Product = require('./models/product'); // 데이터 모델을 정의한 파일을 불러와서 사용

main().catch(err => console.log(err)); 

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand'); // mongoose.connect를 사용하여 MongoDB에 연결
    console.log("Mongo Connect Success")
}

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })

// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(e => {
//         console.log(e)
//     })

const seedProducts = [
    {
        name : 'Fairy Eggplant',
        price : 1.00,
        category : 'vegetable'
    },
    {
        name : 'Organic Goddess Melon',
        price : 4.99,
        category : 'fruit'
    },
    {
        name : 'Organic Mini Seedless Watermelon',
        price : 3.99,
        category : 'fruit'
    },
    {
        name : 'Organic Celery',
        price : 1.50,
        category : 'vegetable'
    },
    {
        name : 'Chocolate Whole Milk',
        price : 2.57,
        category : 'dairy'
    },
]

Product.insertMany(seedProducts)
.then(res => {
    console.log(res)
})
.catch(e => {
    console.log(e)
})