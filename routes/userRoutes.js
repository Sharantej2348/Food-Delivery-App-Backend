const express = require('express')
const { getUserController, updateUserController, resetPasswordController } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

// GET USERS
router.get('/getUser',authMiddleware, getUserController)

// UPDATE USER
router.put('/updateUser', authMiddleware, updateUserController)

// RESET Password
router.put('/resetPassword', authMiddleware, resetPasswordController)

module.exports = router;