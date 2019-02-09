const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig')

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
  // server.get('/', homepage)
};

function register(req, res) {
  // implement user registration
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
      .catch(err => res.status(500).send(`error on line 31`))
    })
    .catch(err => res.status(500).send(`error on line 33`))
}

function login(req, res) {
  // implement user login
}

// function homepage(req, res) {
//   res.send('Welcome!')
// }

function getJokes(req, res) {
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
}
