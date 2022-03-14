require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
PORT = process.env.PORT || 5000;

const postRoute = require('./route/post.route');

// Database Connection
const DB_URL = process.env.DATABASE_URL;
mongoose.connect(DB_URL)
    .then(() => {
        console.log("Database is connected");
    })
    .catch((err) => {
        console.lor(err);
    })



// Middleware
app.use(express.json());
app.use('/api/post', postRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
