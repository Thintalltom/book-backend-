const express = require('express')
const multer =require('multer')
const router = express.Router()
const economic = require('../economic')
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
})



//Step 1: get all the books using the get method of the http
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
    // to upload data into the server you have to state the data 
    const newBooks = {
        title: req.body.title,
        Author: req.body.Author,
        image: req.body.image,
        description: req.body.description
   }
   
   db.query("INSERT INTO economic set ? ",[newBooks], (err, result) => {
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

    db.query('SELECT  `Author`, `title`, `image`, `description` FROM economic WHERE ideconomic = ?', [data], (err, result) => {
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

router.get('/search', (req, res) => {
    const {q, filter} = req.query
    let query = 'SELECT * FROM economic WHERE title LIKE ?';
    let params = [`%${q}%`];

    if(filter) {
        query += 'AND Author = ?';
        params.push(filter)
    }

    db.query(query, params, (err, results) => {
        if(err)
        {
            res.status(500).json({
                error: 'failed to get search'
            })
        } else{
            res.json(results)
        }
    })
})




module.exports = router