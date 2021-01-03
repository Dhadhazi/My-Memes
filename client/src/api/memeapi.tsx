import { apiEndpoint } from "../config";
import Axios from "axios";
import { MemeCategory } from "../types/MemeCategory";
import { MemeUpload } from "../types/MemeUpload";

export async function getAllMemes(idToken: string): Promise<MemeCategory[]> {
  const response = await Axios.get(`${apiEndpoint}/memes`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  });
  console.log("Memes:", response.data);
  return response.data.items;
}

export async function addMeme(
  idToken: string,
  newMeme: MemeUpload
): Promise<MemeCategory> {
  const response = await Axios.post(
    `${apiEndpoint}/memes`,
    JSON.stringify(newMeme),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data.item;
}

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
