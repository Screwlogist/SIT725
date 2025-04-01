const mongoose = require('mongoose');

// Hardcoded MongoDB connection string - replace with your actual connection string
const MONGO_URI = 'mongodb://localhost:27017/task_manager';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;