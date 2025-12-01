const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Category title is required"]
    },
    imageUrl: {
        type: String,
        default: "https://www.istockphoto.com/illustrations/food-logo"
    }
}, {timestamps: true})

module.exports = mongoose.model("Category", categorySchema)