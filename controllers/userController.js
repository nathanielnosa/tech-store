const User = require('../models/User')

const updateUser = async (req, res) => {
  const { user, email, image, pwd } = req.body
  try {
    const foundUser = await User.findOne({ _id: req.params.id }).exec()
    if (!foundUser) return res.status(401).json("No user with ID match")
    if (user) foundUser.username = user
    if (email) foundUser.email = email
    if (image) foundUser.image = image
    if (pwd) foundUser.password = pwd

    const result = await foundUser.save()
    res.status(201).json(result)

  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

module.exports = { updateUser }