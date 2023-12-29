const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const {v4 : uuid} = require("uuid");

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 

const comments = [
    {
        id : uuid(),
        username : '동현',
        comment : '가나다라마바'
    },

    {
        id : uuid(),
        username : '민수2',
        comment : '민수가 2 입니다'
    },
    {
        id : uuid(),
        username : '민수3',
        comment : '민수가 3 입니다'
    },
    {
        id : uuid(),
        username : '민수4',
        comment : '민수가 4 입니다'
    },
    {
        id: uuid(),
        username : '민수5',
        comment : '민수가 5 입니다'
    }
]

// 전체 댓글 조회
app.get('/comments', (req,res) => {
    res.json(comments);
});

// 댓글 추가 
app.post('/comments/new',(req,res) => {
    const { username, comment} = req.body;
    let id = 6;
    comments.push({
        username,
        comment,
        id : uuid()
    });
    //res.redirect("/")
    return res.send("Success");
});

// 상세 조회
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.json(comment)
});

// 업데이트 
app.patch('/profile/:id',(req,res) =>{
    const { id } = req.params; // url 에서 id 를 가져온 뒤 
    const newCommentText = req.body.comment; // req.body.comment 에 담긴 페이로드 가져오기
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    return res.send("UpdateSuccess");
});

// 업데이트 폼으로 이동
app.get('/profile/:id/update',() =>{
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
});


app.listen(4000, () =>{
    console.log("Server Start")
});