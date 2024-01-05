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
    const product = await Product.findById(id)
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