import * as AWS from 'aws-sdk';

AWS.config.update({region: process.env.AWS_REGION});

const S3 = new AWS.S3({
  apiVersion: '2006-03-01'
});

const SQS = new AWS.SQS({
  apiVersion: '2012-11-05'
});

export { SQS, S3 }