const express = require('express')
const app = express()
app.use(express.json());
const PORT = 5000

app.use('/books', require('./api/book'))
app.listen(process.env.PORT || PORT, () => {
    console.log('nOW ON PORT 5000')
})