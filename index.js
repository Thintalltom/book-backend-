const express = require('express')
const app = express()
app.use(express.json());

app.use(function (res, req)  {
    res.body('hello world')
})
app.listen(process.env.PORT || 5000, () => {
    console.log('nOW ON PORT 5000')
})