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
// for auth
app.use('/api/register', require('./routers/auth/register'))
app.use('/api/login', require('./routers/auth/login'))
// for users
app.use('/api/user', require('./routers/user'))
// for products
app.use('/api/product', require('./routers/product'))
// for cart
app.use('/api/cart', require('./routers/cart'))

//port
const PORT = process.env.PORT || 9070

//connect
mongoose.connection.once('open', () => {
  console.log("Database connection is ok")

  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
  })
})