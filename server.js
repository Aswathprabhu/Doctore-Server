const express = require('express');
const bodyParser = require('body-parser');
const executeLighthouse = require('./lighthouse/run-lighthouse');
const doctore = express();
doctore.use(bodyParser.json());

doctore.post('/getCheckedq', async function(req, res) {
  let { webPageUrl } = req.body;
  let lightHouseResults = await executeLighthouse(webPageUrl);
  res.status(200).send(JSON.stringify(lightHouseResults.categories));
})

doctore.listen(7777, function() {
  console.log('Doctore checking on 7777');
});