const express = require('express')
const router = express.Router()
let book = require('../book')

router.get('/',(req, res) => {
    res.json(book)
})

module.exports = router