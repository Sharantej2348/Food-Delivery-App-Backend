const express = require('express')

const authMiddleware = require('../middlewares/authMiddleware')
const {createRestaurantController, getAllRestaurantsController, getRestaurantByIdController, deleteRestaurantController} = require('../controllers/restaurantControllers')
const router = express.Router()

// ROUTES
// CREATE RESTAURANT || POST
router.post('/create', authMiddleware, createRestaurantController)

// GET ALL RESTAURANTS
router.get('/getAll', getAllRestaurantsController)

// GET RESTAURANT BY ID
router.get('/get/:id', getRestaurantByIdController)

// DELETE RESTAURANT
router.delete('/delete/:id',authMiddleware, deleteRestaurantController)


module.exports = router;