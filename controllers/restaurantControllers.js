
const restaurantModel = require("../models/restaurantModel");

// CREATE RESTAURANT
const createRestaurantController = async(req, res) => {
    try {
        const {title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, restaurantCode, coords} = req.body;

        // validation 
        if(!title || !coords){
            return res.status(500).send({
                success: false,
                message: "Please provide title and address"
            })
        }

        const newRestaurant = new restaurantModel({title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, restaurantCode, coords})
        await newRestaurant.save()
        res.status(200).send({
            success: true,
            message: "New Restaurant created Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Restaurant Creation API",
            error
        })
    }
}

// GET ALL RESTAURANTS
const getAllRestaurantsController = async(req, res) => {
    try {
        const restaurants = await restaurantModel.find({})
        if(!restaurants){
            return res.status(404).send({
                success: false,
                message: "No restaurants Available",
            })
        }
        res.status(200).send({
            success: true,
            totalCount: restaurants.length,
            restaurants
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get all restaurant API",
            error
        })
    }
}

// GET RESTAURANT BY ID
const getRestaurantByIdController = async(req, res) => {
    try {
        const restaurantId = req.params.id;
        if(!restaurantId){
            return res.status(404).send({
                succes: false,
                message: "Please provide restauarnt Id"
            })
        }
        // find retauarant
        const restaurant = await restaurantModel.findById(restaurantId)
        if(!restaurant){
            return res.status(404).send({
                success: false,
                message: "Restauarant Not Found"
            })
        }
        res.status(200).send({
            success: true,
            restaurant
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get restaurant By Id api",
            error
        })
        
    }
}

// DELETE RESTAURANT
const deleteRestaurantController = async(req, res) => {
    try {
        const restaurantId = req.params.id;
        if(!restaurantId){
            return res.status(404).send({
                success: false,
                message: "Please provide the restaurant id"
            })
        }
        if(!restaurantId){
            return res.status(404).send({
                success: false,
                message: "No Restauarant Found"
            })
        }

        await restaurantModel.findByIdAndDelete(restaurantId)
        res.status(200).send({
            success: true,
            message: "Restaurant deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error in delete restaurant api",
            error
        })
        
    }
}

module.exports = {createRestaurantController, getAllRestaurantsController, getRestaurantByIdController, deleteRestaurantController};