const express = require('express');
const responseManager = require('../../network/responseManager');

const router = express.Router();

router.get('/', (req, res) => {
  responseManager.success(res, 200, 'Account list');
});

module.exports = router;
