const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { verifyAndAuthenticated } = require('../middlewares/verify')

router.route('/:id')
  .put(verifyAndAuthenticated,userController.updateUser)

module.exports = router