require("dotenv").config(); 

const app = require("./src/app");
const connectDB = require("./src/config/db")


// Database Connection
connectDB()

// Port use
const PORT = process.env.PORT;



// Run the Server
app.listen(PORT, () => {

    console.log(`Server is running at: http://localhost:${PORT}`);

});
