const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const SECRET_OR_KEY = process.env.SECRET_OR_KEY;

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User
    .findOne({ $or: [ {email: req.body.email }, { username: req.body.username } ] })
    .then(user => {
      if (user) {
        if (user.username === req.body.username) {
          errors.username = "Username already exists";
        }
        if (user.email === req.body.email) {
          errors.email = "Email already in use";
        }
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const payload = { id: user.id, username: user.username };

                jwt.sign(
                  payload,  
                  SECRET_OR_KEY,
                  { expiresIn: 7200 }, 
                  (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer' + token
                  });
                });
              })
              .catch(err => {
                return res.status(400).json(err);
              });
          })
        })
      }
    })
})

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  };

  const username = req.body.username;
  const password = req.body.password;
  User
    .findOne({username})
    .then(user => {
      if (!user) {
        errors.username = 'User not found';
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password) 
        .then(isMatch => {
          if (isMatch) {
            const payload = ({ id: user.id, username: user.username });
            
            jwt.sign(
              payload,
              SECRET_OR_KEY,
              {expiresIn: 7200},
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer' + token
              });
            });
          } else {
            errors.password = "Incorrect password"
            return res.status(400).json(errors);
          }
        })
    })
})

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  });
});

module.exports = router;