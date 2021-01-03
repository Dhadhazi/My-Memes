import * as uuid from "uuid";
import { MemeAccess } from "../dataLayer/memesAccess";
import { MemeCategory } from "../models/MemeCategory";

const memeAccess = new MemeAccess();

export async function getAllTodos(userId: string): Promise<MemeCategory[]> {
  return memeAccess.getAllMemes(userId);
}

export async function addMeme(
  newMeme: MemeCategory,
  userId: string
): Promise<MemeCategory> {
  const memeId = uuid.v4();

  const url = `https://${process.env.IMAGES_S3_BUCKET}.s3.amazonaws.com/${memeId}`;

  return await memeAccess.addMeme({
    userId,
    category: newMeme.category,
    files: url,
  });
}
