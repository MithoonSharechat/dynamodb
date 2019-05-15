var docClient = require('../utils/awsClient');
var awsConfig = require('../configs/dynamodbConfigs/config');
  
async function saveFruit(fruit) {
    const params = {
        TableName: awsConfig.aws_table_name,
        Item: {
            fruitId: fruit.fruitId.toString(),
            name: fruit.name
        },
        ConditionExpression: 'attribute_not_exists(fruitId)' // does not allow duplicate fruitId in the table
    };
    var dbResponse = {};
    try{
        var awsPromise = await docClient.dynamoDBClient.put(params).promise();
        if  (awsPromise.$response.httpResponse.statusCode === 200) {
           dbResponse.success = true;
           dbResponse.message = "successfully added data"; 
        } else {
            dbResponse.success = false;
            dbResponse.message = "request failed"; 
        }
    } catch( err) {
        dbResponse.success = false;
        dbResponse.message = err.message;
    }
    return dbResponse;
}


async function getFruit(fruitId) {
    const params = {
        TableName: awsConfig.aws_table_name,
        KeyConditionExpression: 'fruitId = :i',
        ExpressionAttributeValues: {
            ':i': fruitId
        }
    };
    var dbResponse = {};
    try{
        var awsPromise = await docClient.dynamoDBClient.query(params).promise();
        dbResponse.success = true;
        dbResponse.message = "successfully queried data";
        dbResponse.data = awsPromise.Items;
    } catch( err) {
        dbResponse.success = false;
        dbResponse.message = "request failed"; 
    }
    return dbResponse;
}


async function deleteFruit(fruitId) {
    const params = {
        TableName: awsConfig.aws_table_name,
        Key: { 'fruitId' : fruitId},
        ConditionExpression: 'fruitId = :i',
        ExpressionAttributeValues: {
            ':i': fruitId
        }
    };
    var dbResponse = {};
    try{
        var awsPromise = await docClient.dynamoDBClient.delete(params).promise();
        dbResponse.success = true;
        dbResponse.message = "successfully deleted data";
    } catch( err) {
        dbResponse.success = false;
        dbResponse.message = "request failed"; 
    }
    return dbResponse;
}

async function getFruits() {
    const params = {
        TableName: awsConfig.aws_table_name
    };
    var dbResponse = {};
    try{
        var awsPromise = await docClient.dynamoDBClient.scan(params).promise();
        dbResponse.success = true;
        dbResponse.message = "successfully fetched all data";
        dbResponse.data = awsPromise.Items;
    } catch( err) {
        dbResponse.success = false;
        dbResponse.message = "request failed"; 
    }
    return dbResponse;
}


module.exports.saveFruit = saveFruit;
module.exports.getFruit = getFruit;
module.exports.deleteFruit = deleteFruit;
module.exports.getFruits = getFruits;