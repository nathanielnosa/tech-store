const Product = require('../models/Product')

const createProduct = async (req, res) => {
  const { title, description, price, image, size, color, isAvailable, inStock, category } = req.body
  try {
    const newProduct = await Product.create({
      title,
      description,
      price,
      image,
      size,
      color,
      isAvailable,
      inStock,
      category,
    })
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }

}
const updateProduct = async (req, res) => {
  const { title, description, price, image, size, color, isAvailable, inStock, category } = req.body
  try {
    const foundProduct = await Product.findOne({ _id: req.params.id }).exec()
    if (!foundProduct) return res.status(401).json("No product with ID match")
    if (title) foundProduct.title = title
    if (description) foundProduct.description = description
    if (price) foundProduct.price = price
    if (image) foundProduct.image = image
    if (size) foundProduct.size = size
    if (color) foundProduct.color = color
    if (isAvailable) foundProduct.isAvailable = isAvailable
    if (inStock) foundProduct.inStock = inStock
    if (category) foundProduct.category = category

    const result = await foundProduct.save()
    res.status(201).json(result)

  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const deleteProduct = async (req, res) => {
  try {
    const foundProduct = await Product.findOne({ _id: req.params.id }).exec()
    if (!foundProduct) return res.status(401).json("No product with ID match")
    const result = await foundProduct.deleteOne({ _id: req.params.id })
    res.status(200).json(result)

  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const getProduct = async (req, res) => {
  try {
    const foundProduct = await Product.findOne({ _id: req.params.id }).exec()
    if (!foundProduct) return res.status(401).json("No product with ID match")
    res.status(200).json(foundProduct)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const getAllProduct = async (req, res) => {
  const query = req.query.new
  try {
    const foundProduct = query
      ? await Product.find().sort({ _id: -1 }).limit(3)
      : await Product.find().exec()
    if (!foundProduct) return res.status(401).json("No user with ID match")
    res.status(200).json(foundProduct)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

module.exports = { createProduct, updateProduct, deleteProduct, getProduct, getAllProduct }