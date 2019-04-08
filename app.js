const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const events = require("./routes/api/events");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use("/api/users", users);
app.use("/api/events", events);

app.get("/", (req, res) => res.send("PubStats"));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));