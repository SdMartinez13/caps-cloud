'use strict';

const AWS = require('aws-sdk');

const { Consumer } = require('sqs-consumer');

AWS.config.update({ region: 'us-west-2' });

const message = process.argv[2];

const sns = new AWS.SNS();

const topic = 'arn:aws:lambda:us-west-2:555451283466:function:lab19-sns-reciever';


const payload = {
  Message: message,
  TopicArn: topic,
};

sns.publish(payload, (err, data) => {
  if (err) {
    console.error(err);
  }
  console.log(data);
});

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/555451283466/lab19VendorQueue',
  handleMessage: (data) => {
    console.log('I\'m here');
    let body = JSON.parse(data.Body);
    console.log('I\'m here', body);
    console.log('Message Recieved: ', body);
  },
});

app.start();
