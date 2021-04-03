const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', async (req, res) => {
  let response;
  if (req.query.accountId) {
    response = await controller.getBalance(req.query.accountId);
  } else {
    const filter = req.query.identifier || null;
    response = await controller.getPolicy(filter);
  }
  res.status(response.code).send({
    error: response.error,
    body: response.body,
  });
});

router.post('/', async (req, res) => {
  const response = await controller.createPolicy(req.body);
  res.status(response.code).send({
    error: response.error,
    body: response.body,
  });
});

router.delete('/', async (req, res) => {
  const response = await controller.removePolicy(req.body);
  res.status(response.code).send({
    error: response.error,
    body: response.body,
  });
});

router.patch('/', async (req, res) => {
  const response = await controller.editPolicy(req.body);
  res.status(response.code).send({
    error: response.error,
    body: response.body,
  });
});

module.exports = router;
