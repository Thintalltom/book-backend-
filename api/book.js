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

const upload = multer({
    storage: storage
})
router.get('/', (req, res) => {
    //step 1 select all elements in the table
        db.query('SELECT * FROM genres', (err, result) => {
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
    const name = req.body.name;
    const image = req.body.image;
    const values = [name, image]
   
    db.query("INSERT INTO genres  SET ? ",values, (err, result) => {
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