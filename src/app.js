const express = require("express")
const cookieParser = require("cookie-parser")


// Routes required
const authRouter = require("./routes/auth.route")
const accountRouter = require("./routes/account.route")
const transactionRouter = require("./routes/transaction.route")


// Initialize the express
const app = express()


// Use Inbuilt middleware
app.use(express.json())
app.use(cookieParser())


// Use Routes
app.use("/api/auth",authRouter)
app.use("/api/accounts",accountRouter)
app.use("/api/transaction",transactionRouter)

// General api
app.get("/", (req, res) => {
    res.send("Ledger Service is up and running")
})




module.exports = app