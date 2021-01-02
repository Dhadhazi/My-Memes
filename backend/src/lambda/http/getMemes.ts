import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";

import { getAllTodos } from "../../businessLogic/memes";
import { getUserIdFromHeader } from "../../auth/utils";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const userId = getUserIdFromHeader(event.headers.Authorization);

  const memes = await getAllTodos(userId);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      items: memes,
    }),
  };
};
