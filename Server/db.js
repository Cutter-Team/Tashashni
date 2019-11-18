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

const users = new mongoose.Schema({
  email: String,
  password: String,
  username: String
});

const business = new mongoose.Schema({
  description: {},
  offers: [],
  type: String
});

// End Schema

//MODELS
const Users = mongoose.model("users", users);
const Business = mongoose.model("businesses", business);

//QUERIES FUNCTIONS

const businessTB = (callback, data) => {
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

const findBestTripTB = async (callBack, budgetObj) => {
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
  callBack(results);
};

//MODULE EXPORTS
module.exports = { businessTB, findBestTripTB };
