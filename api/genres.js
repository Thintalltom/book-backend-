const express = require('express')
const router = express.Router()
const genres = require('../Genre')
const multer = require('multer')
const path = require('path')
const mysql = require('mysql2')
const db= require('../config/database')

db.connect((err) => {
    if(err) {
        throw err
    }
    console.log('connected to db4')
})

// creating unique ame for each file
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
//function for upload image
const upload = multer({
    storage:storage
})

router.get('/:id', (req, res) => {
    const found = genres.some((genres) =>  genres.id === parseInt(req.params.id))
    if(found){
        res.json(genres.filter((genres) => genres.id === parseInt(req.params.id)))
    }else 
    {
        res.sendStatus(400)
    }
})


router.post('/',  (req, res) => {
    const newGenres = {
        name: req.body.name,
        img: req.file.filename
    }
    
    db.query('INSERT INTO genres set ? ', [newGenres], (err, result) => {
        if(err)
        {
            res.status(400).json(err)
        }else
        {
            res.status(200).json(result);
        }   
    })
})

//you need to get the books in order for it to show on the frontend page
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


router.put('/:id', (req, res) => {
    const found = genres.some((genres) =>  genres.id === parseInt(req.params.id))
    if(found){
        const updateGenres = req.body
        genres.map(genres => {
            if(genres.id === parseInt(req.params.id)) {
                genres.id = updateGenres.id ? updateGenres.id: genres.id
                genres.name = updateGenres.name ? updateGenres.name: genres.name
                res.json({
                    message: 'Gneres has been updated',
                    genres
                }) 
            }
        })
    }
})

router.delete('/:id', (req, res) => {
    const found = genres.some((genres) =>  genres.id === parseInt(req.params.id))
    if(found) {
        genres = genres.filter((genres) => genres.id !== parseInt(req.params.id))
        res.json({
            message: 'Genres has been successful removed',
            genres
        })
    }else {
        res.sendStatus(403)
    }
})
module.exports = router