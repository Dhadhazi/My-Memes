import { apiEndpoint } from "../config";
import Axios from "axios";

export async function getUploadUrl(
  idToken: string,
  memeId: string
): Promise<string> {
  const response = await Axios.post(
    `${apiEndpoint}/memes/${memeId}/attachment`,
    "",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data.uploadUrl;
}

export async function uploadFile(
  uploadUrl: string,
  file: Buffer
): Promise<void> {
  await Axios.put(uploadUrl, file);
}
