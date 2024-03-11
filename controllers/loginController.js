const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body
  try {
    const foundUser = await User.findOne({ username: user }).exec()
    const match = await bcrypt.compare(pwd, foundUser.password)
    if (!match) {
      res.status(401).json('Invalid pwd')
    } else {
      const { password, ...others } = foundUser._doc
      const access_token = jwt.sign(
        { id: foundUser._id, isAdmin: foundUser.isAdmin },
        process.env.JWT_TK,
        { expiresIn: "3d" })
      res.status(200).json({ others, access_token })

    }
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

module.exports = { handleLogin }