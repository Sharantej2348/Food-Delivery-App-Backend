const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const { json } = require("express");
const jsonwebtoken = require('jsonwebtoken')

// RGISTER CONTROLLER
const registerController = async (req, res) => {
    try {
        const {username, email, password, phone, address} = req.body;

        // Validation
        if(!username || !email || !password || !phone || !address){
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            })
        }

        // Check User
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(500).send({
                success: false,
                message: "Email already registered, please login"
            })
        }

        // Hashing password
        var salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create New user
        const user = await userModel.insertOne({username, email, password: hashedPassword, address, phone})
        res.status(201).send({
            success: true,
            message: "Successfully Registered"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: "Error in register API", error})
    }
}

// LOGIN CONTROLLER
const loginController = async(req, res) => {
    try {
        const {email, password} = req.body

        // Validation
        if(!email || !password){
            return res.status(500).send({
                success: false,
                message: "Please provide a valid email or password",
                error
            })
        }
        // Check User
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found",
                error
            })
        }

        // Compare User Password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials"
            })
        }
        // Token Creation
        const token = jsonwebtoken.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        res.status(200).send({
            success: true,
            message: "Login Success",
            token,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login API",
            error
        })
        
    }
}

module.exports = { registerController, loginController };