const express = require('express');
const controller = require('./controller');
const responseManager = require('../../network/responseManager');

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

router.patch('/', (req, res) => {
  const editedAccount = controller.editAccount(req.body);
  editedAccount
    .then((response) => {
      responseManager.success(res, response.code, response.body);
    })
    .catch((response) => {
      responseManager.fail(res, response.code, response.error);
    });
});

module.exports = router;
