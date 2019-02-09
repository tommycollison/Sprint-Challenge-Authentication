const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session')

const configureRoutes = require('../config/routes.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(session({
  // configure express-session middleware
    name: 'notsession', // default is connect.sid
    secret: 'nobody tosses a dwarf!',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
    }, // 1 day in milliseconds
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
    resave: false,
    saveUninitialized: false,
}))

server.use(express.json());

configureRoutes(server);

module.exports = {
  server,
};
