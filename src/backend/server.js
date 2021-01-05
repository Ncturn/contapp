const express = require('express');
const bodyParser = require('body-parser');
const router = require('./network/routes');

const app = express();
router(app);
app.use(bodyParser.json());
app.listen(3000, () => {
  console.log('server on');
});
