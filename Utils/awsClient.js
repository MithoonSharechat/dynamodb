var aws = require('aws-sdk');
var awsConfig = require('../Configs/dynamodbConfigs/config');
var env = 'dev';
//var env = 'local';
var awsConnectionConfig = env === 'local' ? awsConfig.aws_local_config : awsConfig.aws_remote_config;
aws.config.update(awsConnectionConfig);

const dynamoDBClient = new aws.DynamoDB.DocumentClient();

const params = {
    TableName: awsConfig.aws_table_name
};

module.exports.dynamoDBClient = dynamoDBClient;