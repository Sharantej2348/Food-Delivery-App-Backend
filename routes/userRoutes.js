const express = require('express')
const { getUserController, updateUserController } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

// GET USERS
router.get('/getUser',authMiddleware, getUserController)

// UPDATE USER
router.put('/updateUser', authMiddleware, updateUserController)

module.exports = router