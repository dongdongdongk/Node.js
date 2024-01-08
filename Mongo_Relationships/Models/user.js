const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo') // �������� �̿��ؼ� ����DB ����

// ���� Ȯ�� �ڵ� 
const db = mongoose.connection; // MongoDB ���ῡ ���� ������ ��´�. �� ������ db ������ �Ҵ� 
db.on("error", console.error.bind(console, "connection error"), {
    useNewUrlParser: true, // �ֽ� ������ ����̹����� ȣȯ���� ����
    useUnifiedTopology: true,
});
db.once("open", () => { // �� ���� ����Ǵ� �̺�Ʈ ������ ��� MongoDB�� ���������� ����Ǿ��� �� �޼���
    console.log("Database connected");
});

const userSchema = new mongoose.Schema({
    first : String,
    last : String,
    addresses : [
        {
            _id : {_id : false}, // �ڵ����� �����Ǵ� id ���� 
            street : String,
            city : String,
            state : String,
            county : String
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first : 'Harry',
        last : 'Potter'
    })
    u.addresses.push({
        street : '123 sesame St.',
        city : 'New York',
        state : 'NY',
        county : 'USA'
    })
    const res = await u.save();
    console.log(res);
}

makeUser();