const express = require('express')
const { getUserController, updateUserController, resetPasswordController, deleteProfileController } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

// GET USERS
router.get('/getUser',authMiddleware, getUserController)

// UPDATE USER
router.put('/updateUser', authMiddleware, updateUserController)

// RESET PASSWORD
router.put('/resetPassword', authMiddleware, resetPasswordController)

// DELETE USER
router.delete('/deleteUser/:id', authMiddleware, deleteProfileController)

module.exports = router;