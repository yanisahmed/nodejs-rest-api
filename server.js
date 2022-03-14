require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const postRoute = require('./route/post.route');
const userRoute = require('./route/user.route')

// Express Initialization
const app = express();
PORT = process.env.PORT || 5000;



// Database Connection
const DB_URL = process.env.DATABASE_URL;
mongoose.connect(DB_URL)
    .then(() => {
        console.log("Database is connected");
    })
    .catch((err) => {
        console.lor(err);
    })

// Default Error Handling

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({
        "error": err
    });
}

// Middleware
app.use(express.json());
app.use('/api/post', postRoute);
app.use('/api/user', userRoute);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
