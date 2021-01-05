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

export async function deleteCategory(
  idToken: string,
  categoryId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/memes/delete/${categoryId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  });
}

export async function updateCategory(
  idToken: string,
  updatedCategory: MemeCategory
): Promise<MemeCategory> {
  const response = await Axios.post(
    `${apiEndpoint}/memes/update/${updatedCategory.categoryId}`,
    JSON.stringify(updatedCategory),
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
    `${apiEndpoint}/memes/attachment/${memeId}`,
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
): Promise<boolean> {
  await Axios.put(uploadUrl, file);
  return true;
}
