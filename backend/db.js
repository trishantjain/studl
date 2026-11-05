const mongoose = require("mongoose");
require('dotenv').config();
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/";

const connectToMongo = async () => {
    try {
        await mongoose.connect(DB_URL).then(() => {
            console.log("DB Connected")
        })
    } catch (err) {
        console.log("Not connected");
    }
}

module.exports = connectToMongo;