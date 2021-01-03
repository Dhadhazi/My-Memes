import * as AWS from "aws-sdk";
import * as AWSXRay from "aws-xray-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { MemeCategory } from "../models/MemeCategory";

const XAWS = AWSXRay.captureAWS(AWS);

export class MemeAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly memesTable = process.env.MEMES_TABLE
  ) {}

  async getAllMemes(userId: string): Promise<MemeCategory[]> {
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

    return items as MemeCategory[];
  }

  async addMeme(meme: MemeCategory): Promise<MemeCategory> {
    await this.docClient
      .put({
        TableName: this.memesTable,
        Item: meme,
      })
      .promise();

    return meme;
  }
}
