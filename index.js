const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json());
const bodyParser = require("body-parser");
const PORT = 5000
app.use(bodyParser.urlencoded({extended: true}))

app.use('/books',express.static('./upload/images') )
app.use(express.static('public'))
app.use(express.static('upload'))
app.use('/books', require('./api/book'))
app.use('/login', require('./api/login'))
app.use('/auth', require('./api/auth'))
app.use('/genres', require('./api/genres'))
app.use('/documentary', require('./api/documentary'))
app.use('/kidsbook', require('./api/kidsbook'))
app.use('/economics', require('./api/economic'))
app.use('/addbook', require('./api/addbook'))
app.use('/programming', require('./api/programming'))
app.listen(process.env.PORT || PORT, () => {
    console.log('nOW ON PORT 5000')
})