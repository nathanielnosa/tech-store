const Cart = require('../models/Cart')

const createCart = async (req, res) => {
  const { userId, products } = req.body
  try {
    const newCart = await Cart.create({
      userId,
      products,
    })
    res.status(201).json(newCart)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }

}
const updateCart = async (req, res) => {
  const { userId, products } = req.body
  try {
    const foundCart = await Cart.findOne({ _id: req.params.id }).exec()
    if (!foundCart) return res.status(401).json("No cart with ID match")
    if (userId) foundCart.userId = userId
    if (products) foundCart.products = products

    const result = await foundCart.save()
    res.status(201).json(result)

  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const deleteCart = async (req, res) => {
  try {
    const foundCart = await Cart.findOne({ _id: req.params.id }).exec()
    if (!foundCart) return res.status(401).json("No Cart with ID match")
    const result = await foundCart.deleteOne({ _id: req.params.id })
    res.status(200).json(result)

  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const getCart = async (req, res) => {
  try {
    const foundCart = await Cart.findOne({ userId: req.params.id }).exec()
    if (!foundCart) return res.status(401).json("No Cart with ID match")
    res.status(200).json(foundCart)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const getAllCart = async (req, res) => {
  const query = req.query.new
  try {
    const foundCart = query
      ? await Cart.find().sort({ _id: -1 }).limit(3)
      : await Cart.find().exec()
    if (!foundCart) return res.status(401).json("No cart with ID match")
    res.status(200).json(foundCart)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

module.exports = { createCart, updateCart, deleteCart, getCart, getAllCart }