const express = require('express')
const router = express.Router()
let book = require('../book')
const db= require('../config/database')

db.connect((err) => {
    if(err) {
        throw err
    }
    console.log('connected to db')
})
router.get('/', (req, res) => {
    //step 1 select all elements in the table
        db.query('SELECT * FROM books', (err, result) => {
            if(err) {
                res.status(400).json(err)
            } else
            {
                res.json(result) 
            }
           
        })
})



module.exports = router