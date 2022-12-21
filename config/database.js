const mysql = require ('mysql2')

const database= mysql.createConnection({
    host:'containers-us-west-172.railway.app',
    user: 'root',
    password: 'geOBuw3jnZEKbGDO4fkL',
    database: 'railway',
    port: '7448'
})

module.exports = database