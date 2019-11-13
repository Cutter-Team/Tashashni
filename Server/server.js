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

//_______________________________________________________

app.use(express.json());

app.get("/", (req, res) => res.json("test working"));

//SERVER AND DATABASE RESPONSE AND BEHAVIOR

//Please write your code below and only below here
//Start here

app.post("/register", (req, res) => {
  db.register(response => {
    res.send(response);
  });
});

//_________________GET BEST TRIPS

app.get("/getBestTrips", (req, res) => {
  db.getBestTrips(response => {
    res.json(response);
  }, req.body);
});

//End here
//Port
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});
