const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const connectDB = require("./config/db")

require('dotenv').config()
connectDB();

const app = express();

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/auth', require("./routes/authRoutes"))
app.use('/user', require("./routes/userRoutes"))
app.use('/restaurant', require("./routes/restaurantRoutes"))


app.get('/', (req, res) => {
    res.status(200).send("<h1>Welcome to food delivery app")
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    
})