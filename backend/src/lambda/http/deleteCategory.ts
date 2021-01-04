import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import { getUserIdFromHeader } from "../../auth/utils";
import { deleteCategory } from "../../businessLogic/memes";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const category = event.pathParameters.category;

  const userId = getUserIdFromHeader(event.headers.Authorization);

  const deleteitem = await deleteCategory(userId, category);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      deleteitem,
    }),
  };
};
