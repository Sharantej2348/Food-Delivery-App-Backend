
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

module.exports = {createRestaurantController};