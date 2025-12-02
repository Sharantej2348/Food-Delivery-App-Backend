const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createFoodController, getFoodController, getFoodByIdController, getFoodByRestaurantController, updateFoodController, deleteFoodController } = require('../controllers/foodControllers')

const router = express.Router()

// CREATE FOOD
router.post('/create', authMiddleware, createFoodController)

// GET FOOD
router.get('/getAll', getFoodController)

// GET FOOD BY ID
router.get('/getById/:id', getFoodByIdController)

// GET FOOD BY RESTAURANT
router.get('/getByRestauarnt/:id', getFoodByRestaurantController)

// UPDATE FOOD
router.put('/update/:id', authMiddleware, updateFoodController)

// DELETE FOOD
router.delete('/delete/:id', authMiddleware, deleteFoodController)


module.exports = router