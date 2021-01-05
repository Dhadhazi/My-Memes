import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";

import { getUserIdFromHeader } from "../../auth/utils";
import { addMeme, createCategory } from "../../businessLogic/memes";
import { MemeUpload } from "../../models/MemeUpload";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const newMeme: MemeUpload = JSON.parse(event.body);

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

  const newItem =
    newMeme.categoryId.length > 15
      ? await addMeme(newMeme, userId)
      : await createCategory(newMeme, userId);

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
