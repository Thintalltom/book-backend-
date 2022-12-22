const express = require('express')
const router = express.Router()
const multer =require('multer')
let book = require('../book')
const db= require('../config/database')
const bodyParser = require('body-parser');

db.connect((err) => {
    if(err) {
        throw err
    }
    console.log('connected to db')
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})


//function for upload image
const upload = multer({
    storage: storage
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


router.post('/', upload.single('books'), (req, res)=> {
    const author = req.body.author;
    const title = req.body.title;
    const image = `https://book-backend-production.up.railway.app/books/${req.file.filename}`


    db.query("INSERT INTO economic (author, title, image) VALUES (?,  ?, ?, ? ) ",[ author, title, image], (err, result) => {
        if(err)
        {
            res.status(400).json(err)
        }else
        {
            res.status(200).json(result);
        }
    })

})



module.exports = router