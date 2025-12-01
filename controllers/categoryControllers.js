const categoryModel = require("../models/categoryModel");

// CREATE CATEGORY
const createCategoryController = async(req, res) => {
    try {
        const {title, imageUrl} = req.body;
        if(!title){
            return res.status(500).send({
                success: false,
                message: "Please provide title or image"
            })
        }
        const newcategory = new categoryModel({title, imageUrl})
        await newcategory.save()
        res.status(201).send({
            success: true,
            message: "category created successfully",
            newcategory
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create category api",
            error
        })
    }
}

// GET ALL CATEGORIES
const getcategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find({})
        if(!categories){
            return res.status(401).send({
                success: false,
                message: "No categories found"
            })
        }

        res.status(200).send({
            success: true,
            totalCategories: categories.length,
            categories

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get categories api",
            error
        })
        
    }
}

// UPDATE CATEGORY
const updateCategoryController = async(req, res) => {
    try {
        const categoryId = req.params.id;
        const {title, imageUrl} = req.body;
        const updatedcategory = await categoryModel.findByIdAndUpdate(categoryId, {title, imageUrl}, {new: true})
        if(!updatedcategory){
            return res.status(500).send({
                success: false,
                message: "No category Found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Category updated successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Update category api",
            error
        })
        
    }
}

// DELETE CATEGORY
const deleteCategoryController = async(req, res) => {
    try {
        const categoryId = req.params.id;
        if(!categoryId){
            return res.status(500).send({
                success: false,
                message: "Please provide a valid id"
            })
        }
        await categoryModel.findByIdAndDelete(categoryId)
        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete Category api",
            error
        })
        
    }
}

module.exports = {createCategoryController, getcategoriesController, updateCategoryController, deleteCategoryController};