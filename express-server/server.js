const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const executeLighthouse = require('../lighthouse/run-lighthouse');
const app = express();
const doctore = express.Router();

doctore.use(bodyParser.json());

doctore.get('/', function(req, res) {
  res.status(200).send(JSON.stringify({ message: 'Hi' }));
})

doctore.post('/getChecked', async function(req, res) {
  let { webPageUrl } = req.body;
  let lightHouseResults = await executeLighthouse(webPageUrl);
  res.status(200).send(JSON.stringify(lightHouseResults.categories));
})

app.use('/.netlify/functions/server', doctore);
module.exports = app;
module.exports.handler = serverless(app);