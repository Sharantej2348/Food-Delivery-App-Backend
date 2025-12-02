const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
    food: [
        {type: mongoose.Schema.Types.ObjectId,
        ref: "Foods"}
    ],
    payments: {},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ['preparing', 'prepared', 'pending,', 'delivered'],
        default: 'preparing'
    }
}, {timestamps: true})

module.exports = mongoose.model("Orders", ordersSchema)