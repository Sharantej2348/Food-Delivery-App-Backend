const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
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

// RESET PASSWORD
const resetPasswordController = async(req, res) => {
    try {
        const {email, newPassword, answer} = req.body;
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success: false,
                message: "please provide all fields"
            })
        }
        const user = await userModel.findOne({email, answer})
        if(!user){
            return res.status(500).send({
                success: false,
                message: "User not found or Invalid Answer"
            })
        }
        // Hashing password
        var salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword
        await user.save()
        res.status(200).send({
            success: true,
            message: "Password reset successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in password reset API", 
            error
        })
        
    }
}

// DELETE User
const deleteProfileController = async(req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            seccess: true,
            message: "Your account hs been deleted"
        })
    } catch (error) {
        console.log(error);
        resstatus(500).send({
            success: false,
            message: "Error in delete profile api",
            error
        })
        
    }
}

module.exports = {getUserController, updateUserController, resetPasswordController, deleteProfileController}