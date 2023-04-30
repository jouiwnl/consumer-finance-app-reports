import {SQS} from "../lib/AWSConfig";
import {Consumer} from "sqs-consumer";

export class SQSService {
  static receiveMessage(callback) {
    return Consumer.create({
      queueUrl: process.env.AWS_SQS_REPORT_QUEUE,
      handleMessage: async (message) => callback(message),
      heartbeatInterval: 5,
      visibilityTimeout: 20,
      shouldDeleteMessages: true
    })
  }
}