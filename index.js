const express = require('express')
const app = express()
app.use(express.json());
const bodyParser = require("body-parser");
const PORT = 5000


app.use('/books',express.static('./upload/images') )
app.use(bodyParser.urlencoded({extended: false}))
app.use('/books', require('./api/book'))
app.listen(process.env.PORT || PORT, () => {
    console.log('nOW ON PORT 5000')
})