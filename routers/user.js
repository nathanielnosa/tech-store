const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { verifyAndAuthenticated, verifyAdminOnly } = require('../middlewares/verify')

router.route('/')
  .get(verifyAdminOnly, userController.getAllUser)
  
router.route('/:id')
  .put(verifyAndAuthenticated, userController.updateUser)
  .delete(verifyAndAuthenticated, userController.deleteUser)
  .get(verifyAndAuthenticated, userController.getUser)

module.exports = router