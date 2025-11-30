const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to Database ${mongoose.connection.host}`);
        
    } catch (error) {
        console.log("DB connection error: ", error)
    }
}

module.exports = connectDB