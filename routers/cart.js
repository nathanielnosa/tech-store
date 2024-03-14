const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const { verifyAndAuthenticated, verifyAdminOnly, verifyToken } = require('../middlewares/verify')

router.route('/')
  .get(verifyAdminOnly, cartController.getAllCart)
  .post(verifyToken, cartController.createCart)

router.route('/:id')
  .put(verifyAndAuthenticated, cartController.updateCart)
  .delete(verifyAdminOnly, cartController.deleteCart)
  .get(verifyAndAuthenticated, cartController.getCart)

module.exports = router