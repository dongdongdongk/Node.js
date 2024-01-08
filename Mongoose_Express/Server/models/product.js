const mongoose = require('mongoose');
const { Schema } = mongoose; // 몽구스를 요청, DB연결은 필요없다 index 에서 요청할거니까 

// 상품 스키마 정의 
const productSchema = new Schema({
    name : {
        type : String,
        required : [true, 'name cannot be blank']
    },
    price : {
        type : Number,
        required : true,
        min : 0
    },
    category : {
        type : String,
        lowercase : true,
        enum : ['fruit', 'vegetable', 'dairy']
    },
    farm : {
        type : Schema.Types.ObjectId,
        ref : 'Farm' 
    }
})

// 모델 정의
const Product = mongoose.model('Product', productSchema);

// 모델을 다른곳에서 사용 가능하게 익스포트 
module.exports = Product;