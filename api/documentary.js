const express = require('express')
const multer =require('multer')
const router = express.Router()
const documentary = require('../documentary')
const path = require('path')
const db= require('../config/database')

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

//function for upload image
const upload = multer({
    storage: storage
})

db.connect((err) => {
    if(err) {
        throw err
    }
    console.log('connected to db6')
})



//Step 1: get all the books using the get method of the http
router.get('/', (req, res) => {
    //step 1 select all elements in the table
        db.query('SELECT * FROM documentary', (err, result) => {
            if(err) {
                res.status(400).json(err)
            } else
            {
                res.json(result) 
            }
           
        })
})

router.post('/', (req, res)=> {
    // to upload data into the server you have to state the data 
    const newBooks = {
        title: req.body.title,
        Author: req.body.Author,
        image: req.body.image,
        description: req.body.description
   }
   
   db.query("INSERT INTO documentary set ? ",[newBooks], (err, result) => {
       if(err)
       {
           res.status(400).json(err)
       }else
       {
           res.status(200).json(result);
       }
   })
   
})


// function to get details of a particular book
router.get('/:id', (req, res) => {
    const data = req.params.id

    db.query('SELECT  `Author`, `title`, `image`, `description` FROM documentary WHERE iddocumentary = ?', [data], (err, result) => {
        if(err){
            res.status(400).json(err)
        }else 
        {
            res.status(200).json({
                result, 
                message: 'use gotten succesffuly'
            })
        }
    })
})


module.exports = router