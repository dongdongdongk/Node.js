// mongoose 라이브러리 불러오기
const mongoose = require('mongoose');

// models 폴더의 product 파일에서 Product 모델 불러오기
const Product = require('./models/product');

// MongoDB 서버에 연결
mongoose.connect('mongodb+srv://dhk9309:kim1458@cluster0.ckluwao.mongodb.net/products_test?retryWrites=true&w=majority')
    .then(() => {
        console.log("데이터 베이스 연결 성공");
    })
    .catch(() => {
        console.log("데이터 베이스 연결 실패");
    });

// 상품 생성 로직 정의
const createProduct = async (req, res, next) => {
    // 요청 본문에서 name과 price 프로퍼티 추출
    const { name, price } = req.body;

    // Product 모델을 기반으로 새로운 상품 객체 생성
    const newProduct = new Product({
        name: name,
        price: price
    });

    // 새로운 상품 객체를 데이터베이스에 저장 (비동기식 작업)
    try {
        await newProduct.save();

        // 성공적으로 상품이 생성되었을 때 응답
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        // 데이터베이스 저장 중 에러 발생 시 다음 미들웨어로 전달
        next(error);
    }
};

// 상품 조회 로직 정의
const getProducts = async (req, res, next) => {
    try {
        // 데이터베이스에서 모든 상품 조회
        const products = await Product.find().exec();
        
        // 조회된 상품 데이터를 클라이언트에 응답
        res.json(products);
    } catch (error) {
        // 오류 발생 시 다음 미들웨어로 전달
        next(error);
    }
};

// createProduct 함수를 외부에서 사용할 수 있도록 내보내기
exports.createProduct = createProduct;

// getProducts 함수를 외부에서 사용할 수 있도록 내보내기
exports.getProducts = getProducts;
