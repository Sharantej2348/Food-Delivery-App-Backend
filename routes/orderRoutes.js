const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware');
const { createOrderController } = require('../controllers/orderControllers');

const router = express.Router()

// PLACE ORDER
router.post('/placeOrder', authMiddleware, createOrderController)

module.exports = router;