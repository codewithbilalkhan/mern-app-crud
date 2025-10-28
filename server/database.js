const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/bookStore").then(() => {
        console.log("DB connected successfully");
    }).catch((err) => {
        console.log("DB connection failed", err);
    });
}

module.exports = connectDB;