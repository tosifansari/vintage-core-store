// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database Error: ${error.message}`);
        process.exit(1); // Server crash code agar connection fail ho
    }
};

module.exports = connectDB;