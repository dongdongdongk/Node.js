const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const AppError = require('./AppError');

app.use(cors()) // cors
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // 쿼리스트링 
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
app.get('/products', async (req, res) => {
    const { category } = req.query;
    let products;
    console.log("category" + category)
    if (category) {
        // 카테고리가 제공된 경우 해당 카테고리에 속한 상품을 조회
        products = await Product.find({ category });
    } else {
        // 카테고리가 제공되지 않은 경우 모든 상품 조회
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


// 상품 상세 조회
app.get('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    if (!product) {
        throw new AppError('Product Not Found', 404);
    }
    res.send(product);
}));

// 상품 추가 (필요없을듯)
app.get("/product/new", async (req, res) => {
    console.log("UPDATE PAGE");
});

// 상품 추가
app.post("/product/new",wrapAsync (async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send("making your product");
}));

// 상품 업데이트 
app.get("/product/:id/edit", async (req, res) => {
    const product = await Product.findById(id);
    res.send(product);
});

// 상품 업데이트 
app.put("/product/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // findByIdAndUpdate 대신 findById 와 save 를 사용하여 업데이트
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send("상품을 찾을 수 없습니다.");
        }

        // 업데이트할 데이터 적용
        product.set(req.body);

        // 업데이트된 상품 저장
        await product.save();

        // 업데이트된 상품을 클라이언트에게 보냄
        res.send(product);
    } catch (error) {
        console.error('상품 업데이트 중 오류 발생:', error);
        res.status(500).send("상품 업데이트 중 오류 발생");
    }
});

// 상품 삭제 
app.delete("/product/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Product.deleteOne({ _id: id });
        // 삭제 성공 여부에 따라 응답
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