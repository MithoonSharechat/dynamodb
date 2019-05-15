var Controllers = require('./controllers/fruitsController.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var awsConfig = require('./configs/dynamodbConfigs/config.js');
app.use(bodyParser.json());

app.get('/getFruit/:fruitId', Controllers.getFruitController);
app.get('/getFruits', Controllers.getFruitsController);
app.post('/saveFruit', Controllers.saveFruitController);
app.delete('/deleteFruit/:fruitId', Controllers.deleteFruitController);

app.listen(8081, ()=> {
    console.log("server started listening at port 8081");
});

module.exports = app;