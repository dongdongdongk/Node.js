const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 

const comments = [
    {
        username : '동현',
        comment : '가나다라마바'
    },

    {
        username : '민수1',
        comment : '민수가 1 입니다'
    },
    {
        username : '민수2',
        comment : '민수가 2 입니다'
    },
    {
        username : '민수2',
        comment : '민수가 2 입니다'
    },
    {
        username : '민수2',
        comment : '민수가 2 입니다'
    }
]

// 전체 댓글 조회
app.get('/comments', (req,res) => {
    res.json(comments);
});

// 댓글 추가 
app.post('/comments/new',(req,res) => {
    const { username, comment} = req.body;
    comments.push({
        username,
        comment
    });
    return res.send("Success");
});


app.listen(4000, () =>{
    console.log("Server Start")
});