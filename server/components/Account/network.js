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

router.post('/', (req, res) => {
  const newAccount = controller.createAccount(req.body);
  newAccount
    .then((response) => {
      responseManager.success(res, response.code, response.body);
    })
    .catch((response) => {
      responseManager.fail(res, response.code, response.error);
    });
});

router.delete('/', (req, res) => {
  const deletedAccount = controller.deleteAccount(req.body.identifier);
  deletedAccount
    .then((response) => {
      responseManager.success(res, response.code, response.body);
    })
    .catch((response) => {
      responseManager.fail(res, response.code, response.error);
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
