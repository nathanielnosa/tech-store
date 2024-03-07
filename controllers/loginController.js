const User = require('../models/User')
const bcrypt = require('bcrypt')


const handleLogin = async (req, res) => {
  const { user, pwd } = req.body
  try {
    const foundUser = await User.findOne({ username: user }).exec()
    const match = await bcrypt.compare(pwd, foundUser.password)
    if (!match) {
      res.status(401).json('Invalid pwd')
    } else {
      const { password, ...others } = foundUser._doc
      res.status(200).json(others)
    }
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

module.exports = { handleLogin }