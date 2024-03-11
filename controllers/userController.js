const User = require('../models/User')
const bcrypt = require('bcrypt')

const updateUser = async (req, res) => {
  const { user, email, image, pwd } = req.body
  try {
    const hashPwd = await bcrypt.hash(pwd, 10)
    const foundUser = await User.findOne({ _id: req.params.id }).exec()
    if (!foundUser) return res.status(401).json("No user with ID match")
    if (user) foundUser.username = user
    if (email) foundUser.email = email
    if (image) foundUser.image = image
    if (pwd) foundUser.password = hashPwd

    const result = await foundUser.save()
    res.status(201).json(result)

  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const deleteUser = async (req, res) => {
  try {
    const foundUser = await User.findOne({ _id: req.params.id }).exec()
    if (!foundUser) return res.status(401).json("No user with ID match")
    const result = await foundUser.deleteOne({ _id: req.params.id })
    res.status(200).json(result)

  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const getUser = async (req, res) => {
  try {
    const foundUser = await User.findOne({ _id: req.params.id }).exec()
    if (!foundUser) return res.status(401).json("No user with ID match")
    res.status(200).json(foundUser)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const getAllUser = async (req, res) => {
  try {
    const foundUser = await User.find().exec()
    if (!foundUser) return res.status(401).json("No user with ID match")
    res.status(200).json(foundUser)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

module.exports = { updateUser, deleteUser, getUser, getAllUser }