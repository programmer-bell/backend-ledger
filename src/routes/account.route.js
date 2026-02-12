const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const accountController = require("../controllers/account.controller")



// Initilaized the router 
const router = express.Router()



// API Routes
router.post("/",authMiddleware.authMiddleware, accountController.createAccountController)



module.exports = router