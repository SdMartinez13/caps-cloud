'use strict';

const { Consumer } = require('sqs-consumer');
const { Producer } = require('sqs-producer');
const Chance = require('chance');
const chance = new Chance();

const producer = Producer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/555451283466/lab19DeliveryQueue.fifo',
  region: 'us-west-2',
});

async function confirmDelivery(data){
  let message = '';
  try {
    let body = JSON.parse(data.Body);
    console.log('am I working????');
    message = body.Message;
    console.log(message);
  } catch (e){
    console.log('Im broken', e.message);
  }

  let stringifiedMessage = JSON.stringify(message);

  let payload = {
    id: 'testId',
    body: stringifiedMessage,
    groupId: 'group1234',
    deduplicationId: chance.guid(),
  };

  try {
    let response = await producer.send(payload);
    console.log(response);
  } catch (e) {
    console.log(e);
  }

}


const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/356127598444/messages-demo',
  handleMessage: confirmDelivery,
});

app.start();
