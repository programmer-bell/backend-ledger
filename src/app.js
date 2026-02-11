const express = require("express")
const cookieParser = require("cookie-parser")


// Routes required
const authRouter = require("./routes/auth.route")

// Initialize the express
const app = express()

// Use Inbuilt middleware
app.use(express.json())
app.use(cookieParser())


// Use Routes
app.use("/api/auth",authRouter)




module.exports = app