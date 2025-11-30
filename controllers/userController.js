const userModel = require('../models/userModel')

// GET User info
const getUserController = async (req, res) => {
    try {
        // find User
        const user = await userModel.findById({_id:req.userId})
        // validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        // hide password
        user.password = undefined
        res.status(200).send({
            success: true,
            message: "User data get Successfull",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get User API", 
            error
        })
        
    }
    
}

// Update User
const updateUserController = async(req, res) => {
    try {
        // find user
        const user = await userModel.findById({_id: req.userId})
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            })
        }

        // Update 
        const {username, address, phone} = req.body
        if(username) user.username = username
        if(address) user.address = address
        if(phone) user.phone = phone

        // Save user
        await user.save()
        res.status(200).send({
            success: true,
            message: "User Updated Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Update user API",
            error
        })
        
    }
}

module.exports = {getUserController, updateUserController}