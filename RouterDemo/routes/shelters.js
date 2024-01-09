const express = require('express')
const router = express.Router(); // 새로운 라우터 객체를 반환


router.get('/', (req, res) => {
    res.send("All SHELTERS")
})

router.post('/', (req, res) => {
    res.send("POST")
})

router.get('/:id', (req, res) => {
    res.send("VIEWING ONE")
})

router.get('/:id/edit', (req, res) => {
    res.send("EDIT")
})

module.exports = router;