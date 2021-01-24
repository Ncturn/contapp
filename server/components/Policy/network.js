const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', async (req, res) => {
  const filter = req.query.policy || null;
  const response = await controller.getPolicy(filter);
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
  const response = await controller.patchPolicy(req.body);
  res.status(response.code).send({
    error: response.error,
    body: response.body,
  });
});

module.exports = router;
