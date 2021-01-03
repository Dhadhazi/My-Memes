import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";

import { getUserIdFromHeader } from "../../auth/utils";
import { MemeCategory } from "../../models/MemeCategory";
import { addMeme } from "../../businessLogic/memes";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const newMeme: MemeCategory = JSON.parse(event.body);

  const userId = getUserIdFromHeader(event.headers.Authorization);

  if (newMeme.category.length < 3)
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: "Category name too short",
    };

  const newItem = await addMeme(newMeme, userId);

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      item: newItem,
    }),
  };
};
