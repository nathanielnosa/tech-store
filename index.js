require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConfig')

//initialize an object
const app = express()
// allow json
app.use(express.json())
// db
connectDB()
// routers

//port
const PORT = process.env.PORT || 9070

//connect
mongoose.connection.once('open', () => {
  console.log("Database connection is ok")

  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost`)
  })
})