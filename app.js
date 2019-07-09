const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const db = process.env.MONGO_URI;
const users = require("./routes/api/users");
const players = require("./routes/api/players");
const matches = require("./routes/api/matches");
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50MB' }));

app.use('/public', express.static(__dirname + '/public'));

mongoose
.connect(db)
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

app.use("/api/users", users);
app.use("/api/players", players);
app.use("/api/matches", matches);

app.use(passport.initialize());
app.get("/", (req, res) => res.sendFile('index.html', { root: __dirname }));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));