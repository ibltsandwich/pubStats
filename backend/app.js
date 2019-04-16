const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("pubStats"));

mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use("/api/users", users);

app.use(passport.initialize());

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));