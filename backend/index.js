const connectToMongo = require("./db")
const express = require('express')
let cors = require('cors')
require('dotenv').config();
const ROUTE_URL = process.env.ROUTE_URL;

connectToMongo();

const app = express()
const port = process.env.BK_PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/auth', require('./routes/auth'))
app.use('/ques', require('./routes/ques'))
app.use('/contact', require('./routes/contact'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
