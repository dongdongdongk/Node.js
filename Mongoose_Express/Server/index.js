const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const AppError = require('./AppError');

app.use(cors()) // cors
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // ������Ʈ�� 
// getting-started.js
const mongoose = require('mongoose');

// Product �� ��û
const Product = require('./models/product');

// ���� �� ��û

const Farm = require('./models/farm');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand'); // ������ �κ��� DB��
    console.log("Mongo Connect Success")
}
// ��ǰ ��ȸ
app.get('/products', async (req, res) => {
    const { category } = req.query;
    let products;
    console.log("category" + category)
    if (category) {
        // ī�װ��� ������ ��� �ش� ī�װ��� ���� ��ǰ�� ��ȸ
        products = await Product.find({ category });
    } else {
        // ī�װ��� �������� ���� ��� ��� ��ǰ ��ȸ
        products = await Product.find({});
    }
    console.log(products);
    res.send(products);
});

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e));
    }
}


// ��ǰ �� ��ȸ
app.get('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('farm')
    if (!product) {
        throw new AppError('Product Not Found', 404);
    }
    res.send(product);
}));

// ��ǰ �߰� (�ʿ������)
app.get("/product/new", async (req, res) => {
    console.log("UPDATE PAGE");
});

// ��ǰ �߰�
app.post("/product/new",wrapAsync (async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send("making your product");
}));

// ��ǰ ������Ʈ 
app.get("/product/:id/edit", async (req, res) => {
    const product = await Product.findById(id);
    res.send(product);
});

// ��ǰ ������Ʈ 
app.put("/product/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // findByIdAndUpdate ��� findById �� save �� ����Ͽ� ������Ʈ
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send("��ǰ�� ã�� �� �����ϴ�.");
        }

        // ������Ʈ�� ������ ����
        product.set(req.body);

        // ������Ʈ�� ��ǰ ����
        await product.save();

        // ������Ʈ�� ��ǰ�� Ŭ���̾�Ʈ���� ����
        res.send(product);
    } catch (error) {
        console.error('��ǰ ������Ʈ �� ���� �߻�:', error);
        res.status(500).send("��ǰ ������Ʈ �� ���� �߻�");
    }
});

// ��ǰ ���� 
app.delete("/product/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Product.deleteOne({ _id: id });
        // ���� ���� ���ο� ���� ����
        if (result.deletedCount > 0) {
            res.status(200).send("DELETE SUCCESS");
        } else {
            res.status(404).send("ID NOT FOUND");
        }
    } catch (error) {
        console.error('DELETE FAIL');
        res.status(500).send("DELETE FAIL")
    }
});


// ���� �߰� 
app.post("/farm/new",wrapAsync (async (req, res, next) => {
    const newFarm = new Farm(req.body);
    await newFarm.save();
    res.send("making your farm");
}));

// ���� ��ȸ
app.get('/farm', async (req, res) => {
    const farms = await Farm.find({})
    res.send(farms);
});

// ���� �� ��ȸ
app.get('/farm/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const farm = await Farm.findById(id).populate('products')
    if (!farm) {
        throw new AppError('Product Not Found', 404);
    }
    res.send(farm);
}));

// ���忡 ��ǰ ���
app.post('/farm/:id/products/new', wrapAsync(async (req, res ,next) => {
    const { id } = req.params;
    const farm = await Farm.findById(id)
    const { name, price, category } = req.body;
    const product = new Product({name, price, category});
    farm.products.push(product) // farm �� product �־��ֱ�
    product.farm = farm; // product �� farm �־��ֱ� ������̴� �Ѵ� ������Ѵ� 
    await farm.save();
    console.log(product)
    await product.save();
    res.send(farm)
}))


// ���� ����

app.delete('/farm/:id', wrapAsync(async(req, res, next) => {
    const { id } = req.params;
    await Farm.findByIdAndDelete(id);
}))

const handleValidationError = err => {
    console.log(err);
    return new AppError('Validation Failed...', 404)
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if(err.name === 'ValidationError') err = handleValidationError(err);
    next(err);
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})


app.listen(4000, () => {
    console.log("Success");
})