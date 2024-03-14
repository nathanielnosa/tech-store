const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { verifyAndAuthenticated, verifyAdminOnly } = require('../middlewares/verify')

router.route('/')
  .get(productController.getAllProduct)
  .post(verifyAdminOnly, productController.createProduct)
  
router.route('/:id')
  .put(verifyAndAuthenticated, productController.updateProduct)
  .delete(verifyAndAuthenticated, productController.deleteProduct)
  .get(productController.getProduct)

module.exports = router