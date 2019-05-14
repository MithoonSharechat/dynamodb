module.exports = {
    aws_table_name: 'fruits',
    aws_local_config: {
      region: 'local',
      endpoint: 'http://localhost:8000'
    },
    aws_remote_config: {
        accessKeyId: 'accessKey',
        secretAccessKey: 'secretKey',
        region: 'us-east-2'
      }
};