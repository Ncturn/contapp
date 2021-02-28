const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./network/routes');
const mongoDB = require('./mongoDB');

mongoDB('mongodb://localhost:27017/contapp');
const app = express();
app.use(bodyParser.json());
app.use(cors());
router(app);
app.listen(3000, () => {
  console.log('server on');
});
