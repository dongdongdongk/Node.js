const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo')

const db = mongoose.connection; 
db.on("error", console.error.bind(console, "connection error"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
db.once("open", () => { 
    console.log("Database connected");
});


const productSchema = new mongoose.Schema({
    name : String,
    price : Number,
    season : {
        type : String,
        enum : ['Spring', 'Summer', 'Fall', 'Winter']
    }
})

const Product = mongoose.model('Product', productSchema)

// Product.insertMany([
//     { name : 'Goddess Melong' , price : 4.99, season : 'Summer' },
//     { name : 'Goddess Melong2' , price : 5.69, season : 'Fall' },
//     { name : 'Goddess Melong3' , price : 4.39, season : 'Winter' },
// ])

const farmSchema = new mongoose.Schema({
    name : String,
    city : String,
    products : [{type : mongoose.Schema.Types.ObjectId, ref : 'Product'}] // 각 상품의 타입을 객체 ID로 설정해주기
})

const Farm = mongoose.model('Farm', farmSchema);

const makeFarm = async () => {
    // const farm = new Farm({name : "Full belly Farms", city : 'Guinda, CA'});
    const farm = await Farm.findOne({name : 'Full belly Farms'});
    const melon = await Product.findOne({name :'Goddess Melong2' });
    farm.products.push(melon)
    await farm.save()
}

Farm.findOne({name : 'Full belly Farms' })
    .populate('products')
    .then(farm => console.log(farm));
