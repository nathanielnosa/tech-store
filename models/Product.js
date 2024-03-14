const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  size: { type: Array },
  color: { type: Array },
  isAvailable: { type: Boolean, default: true },
  inStock: Number,
  category: { type: Array },
}, { timestamps: true })

const productModel = mongoose.model('Product', productSchema)
module.exports = productModel