const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors(
    {
        origin:['http://localhost:3000'],
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
    }
))
app.use(express.json());
const bodyParser = require("body-parser");
const PORT = 5000
app.use(bodyParser.urlencoded({extended: true}))

app.use('/books',express.static('./upload/images') )

app.use('/books', require('./api/book'))
app.use('/login', require('./api/login'))
app.use('/auth', require('./api/auth'))
app.listen(process.env.PORT || PORT, () => {
    console.log('nOW ON PORT 5000')
})