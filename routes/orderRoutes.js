const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware');
const { createOrderController, orderStatusController } = require('../controllers/orderControllers');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router()

// PLACE ORDER
router.post('/placeOrder', authMiddleware, createOrderController)

// ORDER STATUS
router.post('/orderStatus/:id', authMiddleware, adminMiddleware, orderStatusController)

module.exports = router;