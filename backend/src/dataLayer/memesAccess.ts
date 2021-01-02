import * as AWSXRay from "aws-xray-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { MemeItem } from "../models/MemeItem";

const XAWS = AWSXRay.captureAWS(AWS);

export class MemeAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly memesTable = process.env.MEMES_TABLE
  ) {}

  async getAllMemes(userId: string): Promise<MemeItem[]> {
    const result = await this.docClient
      .query({
        TableName: this.memesTable,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      })
      .promise();
    const items = result.Items;

    return items as MemeItem[];
  }
}
