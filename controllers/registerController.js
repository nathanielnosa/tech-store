const User = require('../models/User')

const bcrypt = require('bcrypt')

const handleRegister = async (req, res) => {
  const { user, email, image, pwd } = req.body
  try {
    const hashPwd = await bcrypt.hash(pwd, 10)
    const newUser = await User.create({
      username: user,
      email: email,
      image: image,
      password: hashPwd
    })
    res.status(201).json(newUser)

  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

module.exports = { handleRegister }