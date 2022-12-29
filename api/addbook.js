const express = require('express')
const router = express.Router()
const multer =require('multer')
const addbook = require('../addbook')
const mysql = require ('mysql2')
const path = require('path')
const db= require('../config/database')

//an upload folder must be created 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload')
    },
// the filename must be stated in order to show teh names and location of the file
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})


db.connect((err) => {
    if(err) {
        throw err
    }
    console.log('connected to db7')
})


//Step 1: get all the books using the get method of the http
router.get('/', (req, res) => {
    //step 1 select all elements in the table
        db.query('SELECT * FROM addbook', (err, result) => {
            if(err) {
                res.status(400).json(err)
            } else
            {
                res.json(result) 
            }
           
        })
})
//function to add file  into an sql database 

router.post('/',  upload.single('file'), (req, res) => {

            const data = {
                image: `https://book-backend-production.up.railway.app/addbook/${req.file.filename}`,
                title: req.body.title,
                author: req.body.author
            }
            db.query("INSERT INTO addbook set ?", [data], (err, result) => {
                if(err)
                {
                    res.status(400).json(err)
                }else
                {
                    res.status(200).json(result);
                    
                }
            })
        })


router.delete('/:id', (req, res) => {
    const data = req.params.id

    db.query('DELETE FROM addbook WHERE idaddbook = ?', [data], (err, result) => {
        if(err)
        {
            res.status(400).json(err)
        }else
        {
            res.status(200).json(result);
            
        }
    })
})

router.put('/:id', upload.single('file'), (req, res) => {

    const data = req.params.id
    const Author = req.body.author
    const title =  req.body.title
    const image = `http://localhost:4001/books/${req.file.filename}`
        

    db.query('UPDATE addbook SET `Author` = ?, `title` = ?,  `image` = ? WHERE idaddbook = ?', [Author, title, image, data], (err, result) => {
        if(err)
        {
            res.status(400).json(err)
        }else
        {
            res.status(200).json({
                result,
                message: 'Book has been update successfully'
            });
            
        }
    })
})
 


module.exports = router