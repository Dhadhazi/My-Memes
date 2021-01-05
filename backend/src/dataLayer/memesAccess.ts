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
    console.log("Get ALL Categories result", result);
    return items as MemeCategory[];
  }

  async getOneCategory(
    userId: string,
    categoryId: string
  ): Promise<MemeCategory[]> {
    const result = await this.docClient
      .query({
        TableName: this.memesTable,
        KeyConditionExpression: "userId = :userId AND categoryId = :categoryId",
        ExpressionAttributeValues: {
          ":userId": userId,
          ":categoryId": categoryId,
        },
      })
      .promise();
    console.log("Get Category result", result);

    return result.Items as MemeCategory[];
  }

  async createMemeCategory(meme: MemeCategory): Promise<MemeCategory> {
    const result = await this.docClient
      .put({
        TableName: this.memesTable,
        Item: meme,
      })
      .promise();
    console.log("Create Category result", result);
    return meme;
  }

  async deleteCategory(userId: string, categoryId: string) {
    const result = await this.docClient
      .delete({
        TableName: this.memesTable,
        Key: {
          userId,
          categoryId,
        },
      })
      .promise();
    console.log("Delete Category result", result);
    return "";
  }

  async updateCategory(meme: MemeCategory) {
    const result = await this.docClient
      .update({
        TableName: this.memesTable,
        Key: {
          userId: meme.userId,
          categoryId: meme.categoryId,
        },
        ExpressionAttributeValues: {
          ":category": meme.category,
          ":files": meme.files,
        },
        UpdateExpression: "SET files = :files, category = :category",
        ReturnValues: "ALL_NEW",
      })
      .promise();

    console.log("Update Category Result", result);

    return result;
  }
}
