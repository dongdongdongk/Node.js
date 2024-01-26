// MongoDB 클라이언트 모듈을 불러옵니다.
const MongoClient = require('mongodb').MongoClient;

// MongoDB 서버 연결을 위한 URL을 정의합니다.
const url = 'mongodb+srv://dhk9309:kim1458@cluster0.ckluwao.mongodb.net/products_test?retryWrites=true&w=majority';

// 상품을 생성하는 함수입니다.
const createProduct = async (req, res, next) => {
    // HTTP 요청에서 받은 데이터를 새 상품 객체로 만듭니다.
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    };

    // MongoDB 클라이언트 객체를 생성합니다.
    const client = new MongoClient(url);

    try {
        // MongoDB에 연결합니다.
        await client.connect();
        
        // 연결된 데이터베이스 객체를 가져오고 'products' 컬렉션에 새 상품을 추가합니다.
        const db = client.db();
        const result = await db.collection('products').insertOne(newProduct);
    } catch (error) {
        // 오류가 발생하면 오류 메시지를 응답으로 전송합니다.
        return res.json({ message: '데이터가 없습니다' });
    } finally {
        // 연결을 항상 닫도록 finally 블록에서 처리합니다.
        client.close();
    }

    // 생성된 상품 정보를 응답으로 전송합니다.
    res.json(newProduct);
};



const getProducts = async (req, res, next) => {
    const client = new MongoClient(url);

    let products;
    try {
        await client.connect();
        const db = client.db();
        products = await db.collection('products').find().toArray();
    } catch (error) {
        return res.json({message : '조회실패'})
    } finally {
        // 연결을 항상 닫도록 finally 블록에서 처리합니다.
        client.close();
    }
    res.json(products);
};

// createProduct와 getProducts 함수를 외부에서 사용할 수 있도록 내보냅니다.
exports.createProduct = createProduct;
exports.getProducts = getProducts;
