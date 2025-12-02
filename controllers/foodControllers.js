const foodModel = require("../models/foodModel");

const createFoodController = async(req, res) => {
    try {
        const {title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating} = req.body;
        if(!title || !description|| !price || !restaurant){
            return res.status(500).send({
                success: false,
                message: "Please provide all fields",
            })
        }
        const newFood = new foodModel({title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating})
        await newFood.save()
        res.status(201).send({
            success: true, 
            message: "Food created Successfully",
            newFood
        })
        if(newFood){
            res.status(404).send({
                success: false,
                message: "Food already exists"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create food api",
            error
        })
    }
}

// GET ALL FOODS
const getFoodController = async(req, res) => {
    try {
        const foods = await foodModel.find()
        if(!foods){
            return res.status(404).send({
                success: false,
                message: "No food item was found"
            })
        }
        res.status(200).send({
            success: true,
            totalFoods: foods.length,
            foods
        })
    } catch (error) {
        console.log();
        res.status(500).send({
            success: false,
            message: "Error in Get food api",
            error
        })
        
    }
}

// GET FOOD BY ID
const getFoodByIdController = async(req, res) => {
    try {
        const foodId = req.params.id;
        if(!foodId){
            return res.status(500).send({
                success: false,
                message: "Please provide a valid id"
            })
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            return res.status(500).send({
                success: false,
                message: "Food Item not found"
            })
        }
        res.status(200).send({
            success: true,
            food
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get food by id api",
            error
        })
        
    }
}

// GET FOOD BY RESTAURANT
const getFoodByRestaurantController = async(req, res) => {
    try {
        const restauarntId = req.params.id;
        if(!restauarntId){
            res.status(500).send({
                success: false,
                message: "Please provide a valid id"
            })
        }
        const foods = await foodModel.find({restaurant: restauarntId})
        if(!foods){
            res.status(500).send({
                success: false,
                message: "Food item not found"
            })
        }
        res.status(200).send({
            success: true,
            foods
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get food by restaurant api",
            error
        })
        
    }
}

const updateFoodController = async(req, res) => {
    try {
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success: false, message: "please provide a valid id"
            })
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            return res.status(404).send({
                success: false,
                message: "Food Item not found"
            })
        }
        const {title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating} = req.body;
        const updatedFood = await foodModel.findByIdAndUpdate(foodId, {title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating}, {new: true})
        res.status(200).send({
            success: true,
            message: "Food Item updates successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: true, 
            message: "Error in update food api",
            error
        })
        
    }
}

// DELETE FOOD
const deleteFoodController = async(req, res) => {
    try {
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success: false,
                message: "please provide a valid id"
            })
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            return res.status(500).send({
                success: false, 
                messgae: "Food item not found"
            })
        }
        await foodModel.findByIdAndDelete(foodId)
        res.status(200).send({
            success: true,
            message: "Food Item deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: true, 
            message: "Error in update food api",
            error
        })
        
    }
}
module.exports = {createFoodController, getFoodController, getFoodByIdController, getFoodByRestaurantController, updateFoodController, deleteFoodController }