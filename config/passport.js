const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys.js');

const options = {};
options.jwtFromRequest= ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey= keys.secretOrKey;

