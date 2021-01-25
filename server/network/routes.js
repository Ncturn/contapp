const express = require('express');
const account = require('../components/Account/network');
const policy = require('../components/Policy/network');

const router = express.Router();
router.get('/', (req, res) => {
  res.header({
    'Access-Control-Allow-Origin': 'http://localhost:8080',
  });
  res.status(200).send({
    error: '',
    body: 'Welcome to ContApp',
  });
});

const routes = (server) => {
  server.use('/', router);
  server.use('/account', account);
  server.use('/policy', policy);
};

module.exports = routes;
