const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")


// config files define port use to import dotenv
dotenv.config({path:"backend/config/config.env"})

// first create config file after import database
connectDatabase();


app.listen(process.env.PORT || 4001,() => {
  console.log(`Server is Working On ${process.env.PORT || 4001}`);
})

//unhandled promise rejection
process.on("unhandleRejection",(err) => {
    console.log(`Error:${err.message}`)
    console.log(`Shuting down the server due to unhandled promise rejection`);

    server.close(() => {
        process.exit(1)})
    
})

