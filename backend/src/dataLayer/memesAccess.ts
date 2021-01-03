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

  async categoryExist(userId: string, category: string) {
    const result = await this.docClient
      .query({
        TableName: this.memesTable,
        KeyConditionExpression: "userId = :userId AND category = :category",
        ExpressionAttributeValues: {
          ":userId": userId,
          ":category": category,
        },
      })
      .promise();
    console.log("Get Category result", result);

    return result.Items as MemeCategory[];
  }

  async createMemeCategory(meme: MemeCategory): Promise<MemeCategory> {
    await this.docClient
      .put({
        TableName: this.memesTable,
        Item: meme,
      })
      .promise();
    return meme;
  }

  async updateFiles(meme: MemeCategory) {
    const result = await this.docClient
      .update({
        TableName: this.memesTable,
        Key: {
          userId: meme.userId,
          category: meme.category,
        },
        ExpressionAttributeValues: {
          ":files": meme.files,
        },
        UpdateExpression: "SET files = :files",
        ReturnValues: "ALL_NEW",
      })
      .promise();

    console.log("Update Category Result", result);

    return result;
  }
}
