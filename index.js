require('dotenv').config(); // load .env variables
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session')

const db = require('./database/dbConfig.js');
const jwt = require('jsonwebtoken')
const secret = 'secret!';


const server = express();

server.use(express.json());
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


function protected(req, res, next){
  // using jwts instead of sessions
  // read the token from the authorization header 
  const token = req.headers.authorization;

  if (token) {
    // verify the token
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        // token is invalid
        res.status(401).json({message: 'Invalid token'})
      } else {
        // token is valid
        next();
      }
    })
  } else {
    res.status(401).json({message: "no token provided"})

  }
}


server.get('/', (req, res) => {
  res.send(`It's Alive!`);
});

function protected(req, res, next){
  // using jwts instead of sessions
  // read the token from the authorization header 
  const token = req.headers.authorization;

  if (token) {
    // verify the token
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        // token is invalid
        res.status(401).json({message: 'Invalid token'})
      } else {
        // token is valid
        next();
      }
    })
  } else {
    res.status(401).json({message: "no token provided"})

  }
}

function generateToken(user){
  const payload = {
    username: user.username,
  }

  const options = {
    expiresIn: '1h',
    jwtid: '12345' // jti
  }

  return jwt.sign(payload, secret, options);
}

server.post('/api/register', (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  db('users')
  .insert(creds)
  .then(ids => {
    const id = ids[0];
    db('users')
    .where({ id })
    .first()
    .then(user => {
      const token = generateToken(user);
      res.status(201).json({id: user.id, token})
    })
    .catch(err => res.status(500).send(err))
  })
  .catch(err => res.status(500).send(err))
})

server.post('/api/login', (req, res) => {
  const credentials = req.body;
  db('users')
  .where({username: credentials.username})
  .first()
  .then(user => {
    if(user && bcrypt.compareSync(credentials.password, user.password)){
      const token = generateToken(user);

      res.status(200).json({token})
    } else {
      res.status(404).json(`Invalid username or password`)
    }
  })
  .catch(error => {res.status(500).send(error)})
})

server.get('/api/jokes', protected, (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
})

const port = process.env.PORT || 3300;
server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});

server.get('/', (req, res) => {
  res.send('Welcome from index.js!')
})