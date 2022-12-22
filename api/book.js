const express = require('express')
const router = express.Router()
const multer =require('multer')
let book = require('../book')
const db= require('../config/database')
const bodyParser = require('body-parser');

const fs = require('fs');

fs.readFile('path/to/your/file', (error, data) => {
  if (error) {
    throw error;
  }

  // data is a Buffer object containing the contents of the file
});



db.connect((err) => {
    if(err) {
        throw err
    }
    console.log('connected to db')
})




router.get('/', (req, res) => {
    //step 1 select all elements in the table
        db.query('SELECT * FROM economic', (err, result) => {
            if(err) {
                res.status(400).json(err)
            } else
            {
                res.json(result) 
            }
           
        })
})


router.post('/', (req, res)=> {
    const Author = req.body.Author;
    const title = req.body.title;
    const image =  Buffer.from(data).toString('utf8');
    const description = req.body.description

    db.query("INSERT INTO economic (Author, title, image, description) VALUES LOAD_FILE('/path/to/file.txt') (?,  ?, ?, ? ) ",[ Author, title, image, description], (err, result) => {
        if(err)
        {
            res.status(400).json(err)
        } else if(image)
        {
            console.log('image usccessfully upload')
        }
        else
        {
            res.status(200).json(result);
        }
    })

})



module.exports = router