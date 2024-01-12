const express = require('express');
const cors = require('cors')
const User = require('./models/user');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // ������Ʈ�� 
app.use(cors());

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/authDemo'); // ������ �κ��� DB��
    console.log("Mongo Connect Success")
}
// ���� Ȯ�� �ڵ� 
const db = mongoose.connection; // MongoDB ���ῡ ���� ������ ��´�. �� ������ db ������ �Ҵ� 
db.on("error", console.error.bind(console, "connection error"), {
    useNewUrlParser: true, // �ֽ� ������ ����̹����� ȣȯ���� ����
    useUnifiedTopology: true,
});
db.once("open", () => { // �� ���� ����Ǵ� �̺�Ʈ ������ ��� MongoDB�� ���������� ����Ǿ��� �� �޼���
    console.log("Database connected");
});

app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password : hash
    })
    await user.save();
    res.send(hash);
})




app.listen(4000, () => {
    console.log("Success");
})