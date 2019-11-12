const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tashashni", {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", function() {
  console.log("mongoose connection error");
});
db.once("open", function() {
  console.log("mongoose connected successfully");
});

//SCHEMAS



//MODELS




//MODULE EXPORTS
module.exports = {

};
