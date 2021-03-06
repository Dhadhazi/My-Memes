import "source-map-support/register";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import { getUploadUrl } from "../../businessLogic/memes";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const memeId = event.pathParameters.memeId;

  console.log("GET upload meme Id received: ", memeId);
  const url = await getUploadUrl(memeId);

  console.log("GET UPLOAD URL Event complete. URL: ", url);

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      uploadUrl: url,
    }),
  };
};
