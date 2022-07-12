const mongoose = require("mongoose");
const coonectDatabase = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/ProductManagement", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
    .catch((err) => console.log(err));
};
module.exports = coonectDatabase;
