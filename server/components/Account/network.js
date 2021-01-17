const express = require('express');
const controller = require('./controller');
const responseManager = require('../../network/responseManager');

const router = express.Router();

router.get('/', (req, res) => {
  const account = controller.getAccount();
  account
    .then((response) => {
      responseManager.success(res, response.code, response.body);
    })
    .catch((response) => {
      responseManager.fail(res, response.code, response.error);
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
  const accountDeleted = controller.deleteAccount(req.body.identifier);
  accountDeleted
    .then((response) => {
      responseManager.success(res, response.code, response.body);
    })
    .catch((response) => {
      responseManager.fail(res, response.code, response.error);
    });
});

module.exports = router;
