const express = require('express')
const router = express.Router()
const path = require('path')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require ('express-session')
let login = require('../login')
//salRounds determines the amount of time needed to hash the password
const saltRounds = 10;
const db= require('../config/database')

db.connect((err) => {
    if(err) {
        throw err
    }
    console.log('connected to db 2')
})

router.get('/', (req, res) => {
    //step 1 select all elements in the table
        db.query('SELECT * FROM login', (err, result) => {
            if(err) {
                res.status(400).json(err)
            } else
            {
                res.json(result) 
                res.send(result)
            }
           
        })
      
    })


    router.post('/',  (req, res)=> {
        // to upload data into the server you have to state the data 
            const username = req.body.username
            const password= req.body.password
        // to hash the password we use bcrypt.hash before the insert method
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if(err) {
                console.log(err)
            }
            db.query("INSERT INTO login (email, password) VALUES (?, ?) ",[username, hash], (err, result) => {
                res.send(result)
               })
        }) 
    })

    
module.exports = router