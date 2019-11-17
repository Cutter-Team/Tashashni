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
  // location: String,
  password: String,
  username: String
});

let business = new mongoose.Schema({
  description: {},
  offers: [],
  type: String
});

// let restaurant = new mongoose.Schema({
//   name: String,
//   location: String,
//   description: String,
// offers: [
//   {
//     name: String,
//     price: Number
//   }
// ]
// });

// let entertainment = new mongoose.Schema({
//   name: String,
//   location: String,
//   minimumPrice: Number,
//   description: String
// });

// let places = new mongoose.Schema({
//   name: String,
//   location: String
// });

// End Schema

//MODELS
let Users = mongoose.model("users", users);
let Business = mongoose.model("businesses", business);
// let Restaurant = mongoose.model("restaurant", restaurant);
// let Entertainment = mongoose.model("entertainment", entertainment);
// let Places = mongoose.model("places", places);

//QUERIES FUNCTIONS
//use const instead of let here
let registerTB = (callback) => {
  Users.create(
    {
      email: "R@gmail.com",
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

let businessTB = (callback, data) => {
  Business.create(
    {
      description: data,
      offers: [
        { name: "Traditional Movie", price: 7.0 },
        { name: "2D Movie", price: 12.0 },

        { name: "3D Movie", price: 16.0 },
        { name: "4D Movie", price: 30.0 }
      ]
    },
    (response, error) => {
      if (error) {
        console.log(error);
      } else {
        callback(response);
      }
    }
  );
};

let findBestTripTB = async (callBack, budgetObj) => {
  let results = [];

  await Business.aggregate(
    [
      { $match: { type: "restaurant" } },
      { $unwind: "$offers" },
      { $match: { "offers.price": { $lt: budgetObj.eat } } },
      {
        $group: {
          _id: "$_id",
          description: { $last: "$description" },
          type: { $last: "$type" },
          offers: { $push: "$offers" }
        }
      }
    ],
    (error, response) => {
      if (error) console.log(error);
      else {
        if (response.length > 0) results.push(response);
      }
    }
  );

  await Business.aggregate(
    // [
    //   { $match: { type: "entertainment" } },
    //   { $unwind: "$offers" },
    //   { $match: { "offers.price": { $lt: budget.eat } } },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       offers: { $push: { offers: "$offers", description: "$description" } }
    //       // description: "$description"
    //     }
    //   }
    // ]
    [
      { $match: { type: "entertainment" } },
      { $unwind: "$offers" },
      { $match: { "offers.price": { $lt: budgetObj.entertainment } } },
      {
        $group: {
          _id: "$_id",
          description: { $last: "$description" },
          type: { $last: "$type" },
          offers: { $push: "$offers" }
        }
      }
    ],

    (error, response) => {
      if (error) console.log(error);
      else {
        if (response.length > 0) {
          results.push(response);
        }
      }
    }
  );
  //entertainment

  callBack(results);
};

//MODULE EXPORTS
module.exports = { registerTB, businessTB, findBestTripTB };
