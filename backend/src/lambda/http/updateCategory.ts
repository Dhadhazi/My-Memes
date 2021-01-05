import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import { MemeCategory } from "../../models/MemeCategory";
import { getUserIdFromHeader } from "../../auth/utils";
import { updateCategory } from "../../businessLogic/memes";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const categoryId = event.pathParameters.categoryId;
  const updatedCategory: MemeCategory = JSON.parse(event.body);

  const userId = getUserIdFromHeader(event.headers.Authorization);

  if (updatedCategory.userId !== userId)
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: "Authentication failed",
    };

  if (updatedCategory.categoryId !== categoryId)
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: "Category Authentication failed",
    };

  if (updatedCategory.category.length < 3)
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: "Category name too short, something strange...",
    };

  if (!Array.isArray(updatedCategory.files))
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: "Files must be an array, even if empty",
    };

  const category = await updateCategory(updatedCategory);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      items: category,
    }),
  };
};
