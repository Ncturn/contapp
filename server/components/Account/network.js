const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', async (req, res) => {
  const accountfilter = req.query.identifier || null;
  const response = await controller.getAccount(accountfilter);
  res.status(response.code).send({
    error: response.error,
    body: response.body,
  });
});

router.post('/', async (req, res) => {
  const response = await controller.createAccount(req.body);
  res.status(response.code).send({
    error: response.error,
    body: response.body,
  });
});

router.delete('/', async (req, res) => {
  const response = await controller.removeAccount(req.body);
  res.status(response.code).send({
    error: response.error,
    body: response.body,
  });
});

router.patch('/', async (req, res) => {
  const response = await controller.editAccount(req.body);
  res.status(response.code).send({
    error: response.error,
    body: response.body,
  });
});

module.exports = router;
