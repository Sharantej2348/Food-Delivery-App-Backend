const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    address: {
        type: Array,
    },
    phone: {
        type: String,
        required: [true, 'phone number is required']
    },
    userType: {
        type: String,
        required: [true, 'User Type is requires'],
        default: 'client',
        enum: ['client', 'admin', 'vendor', 'driver']
    },
    profile: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    }
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)

