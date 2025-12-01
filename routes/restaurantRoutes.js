const express = require('express')

const authMiddleware = require('../middlewares/authMiddleware')
const {createRestaurantController} = require('../controllers/restaurantControllers')
const router = express.Router()

// ROUTES
// CREATE RESTAURANT || POST

router.post('/create', authMiddleware, createRestaurantController)


module.exports = router;