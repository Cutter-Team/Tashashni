const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use((request, response, next) => {
  response.header(`Access-Control-Allow-Origin`, `*`);
  response.header(
    `Access-Control-Allow-Headers`,
    `Origin, X-Requested-with, Content-Type, Accept`
  );
  next();
});

app.use(express.json());

app.get("/", (req, res) => res.json("test working"));

//SERVER AND DATABASE RESPONSE AND BEHAVIOR

//Please write your code below and only below here
//Start here
app.get("/login", (request, response) => {
  db.register(res => {
    response.send(res);
  }, request.body);
});

app.post("/addBusiness", (req, res) => {
  db.businessTB(response => {
    res.send(response);
  }, req.body);
  // res.send("Hello");
});

app.post("/getBestTrip", (req, res) => {
  db.findBestTripTB(response => {
    res.send(response);
  }, req.body);
});

app.post("/register", (request, response) => {
  db.register(res => {
    response.send(res);
  }, request.body);
});

//End here

//Port
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});
