const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./db/db');
const {readdirSync} = require('fs');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
 
require('dotenv').config()

const PORT =process.env.PORT

app.use(express.json())
app.use(cors())

readdirSync('./routes').map((route) => app.use('/api/v3', require('./routes/' + route)))
const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening on port:' ,PORT)
    })
};

server()