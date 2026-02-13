const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const transactionController = require("../controllers/transaction.controller")

// Initialized the routes
const transactionRoutes = express.Router()

// Use routes
transactionRoutes.post("/",authMiddleware.authMiddleware, transactionController.createTransaction)
transactionRoutes.post("/system/initial-funds",authMiddleware.authSystemUserMiddleware, transactionController.createInitialFundTransaction)

module.exports = transactionRoutes

