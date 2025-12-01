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

module.exports = {createCategoryController};