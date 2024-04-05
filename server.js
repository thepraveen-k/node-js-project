const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const contactRoutes = require('./routes/contactRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection'); //




const port = process.env.PORT || 5000;

connectDb()                        //file connected from dbConnection.js
app.use(express.json())
app.use('/api/contacts', require('./routes/contactRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)




//server
app.listen(port, () => {
    console.log(`server is connected on port: ${port}`)
})