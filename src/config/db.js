const mongoose = require("mongoose")

async function connectDB() {

    try {

        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected successfully")

    }
    catch(error){
        console.log("Database connection error:",error)
        process.exit(1)
    }

}

module.exports = connectDB