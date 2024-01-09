const express = require('express')
const router = express.Router(); // 새로운 라우터 객체를 반환


router.get('/', (req, res) => {
    res.send("All DOG")
})

router.post('/', (req, res) => {
    res.send("POST DOG")
})

router.get('/:id', (req, res) => {
    res.send("VIEWING ONE DOG")
})

router.get('/:id/edit', (req, res) => {
    res.send("EDIT DOG")
})

module.exports = router;