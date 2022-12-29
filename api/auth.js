const express = require('express')
const mysql = require('mysql2')
const router = express.Router()
const path = require('path')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const db= require('../config/database')


db.connect((err) => {
    try {
        console.log('connected to db3')
    } catch (error) {
        throw error
    }
})

// using bcrypt to hash the password to save the password in an hashed mode
router.post('/',  (req, res)=> {
    // to upload the data of the user 
        const email = req.body.email
        const password= req.body.password
    // to check if the user details are present in the MYSQL database 
    db.query("SELECT * FROM login WHERE email = ? AND password = ? ",
    [email, password], (err, result) => {
            if(err) {
                console.log(err)
            }
             else 
            {
                res.send({message: 'wrong username and password'})
            }
    })
    
})



module.exports = router