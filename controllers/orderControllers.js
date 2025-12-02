const orderModel = require("../models/orderModel");

const createOrderController = async(req, res) => {
    try {
        const {cart} = req.body;
        if(!cart){
            return res.status(500).send({
                success: false,
                message: "Please provide cart or payment method"
            })
        }
        let total = 0

        cart.map((item) => {
            total +=item.price;
        })

        const newOrder = new orderModel({
            foods: cart,
            payment: total,
            buyer: req.userId
        })
        await newOrder.save()
        res.status(201).send({
            success: true,
            message: "Order placed successfully",
            newOrder
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in place order api",
            error
        })
        
    }
}

module.exports = {createOrderController}