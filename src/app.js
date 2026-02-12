const express = require("express")
const cookieParser = require("cookie-parser")


// Routes required
const authRouter = require("./routes/auth.route")
const accountRouter = require("./routes/account.route")

// Initialize the express
const app = express()

// Use Inbuilt middleware
app.use(express.json())
app.use(cookieParser())


// Use Routes
app.use("/api/auth",authRouter)
app.use("/api/accounts",accountRouter)



module.exports = app