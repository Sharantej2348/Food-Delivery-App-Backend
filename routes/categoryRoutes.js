const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware');
const { createCategoryController, getcategoriesController, updateCategoryController, deleteCategoryController } = require('../controllers/categoryControllers');

const router = express.Router()

// CREATE CATEGORY
router.post('/create', authMiddleware, createCategoryController)

// GET ALL CATEGORIES
router.get('/getAll', getcategoriesController)

// UPDATE CATEGORY
router.put('/update/:id', authMiddleware, updateCategoryController)

// DELETE CATEGORY
router.delete('/delete/:id', authMiddleware, deleteCategoryController)

module.exports = router;