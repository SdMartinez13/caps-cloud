'use strict';

exports.handler = async (event) => {
  let message = event.Records[0].Sns.Message;
  console.log('-----MESSAGE-----', message);

  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify(message),
  };
  return response;
};
