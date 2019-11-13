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

let users = new mongoose.Schema({
  email: String,
  location: String,
  password: String,
  username: String
});

let restaurant = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  offers: [
    {
      name: String,
      price: Number
    }
  ]
});

let entertainment = new mongoose.Schema({
  name: String,
  location: String,
  minimumPrice: Number,
  description: String
});

let places = new mongoose.Schema({
  name: String,
  location: String
});

// End Schema

//MODELS
let Users = mongoose.model("users", users);
let Restaurant = mongoose.model("restaurant", restaurant);
let Entertainment = mongoose.model("entertainment", entertainment);
let Places = mongoose.model("places", places);

//QUERIES FUNCTIONS
//use const instead of let here
let register = callback => {
  Users.create(
    {
      email: "R@gmail.com",
      place: "Amman",
      password: "123",
      username: "Raghad"
    },
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        callback(response);
      }
    }
  );
};

//MODULE EXPORTS
module.exports = { register };
