import * as uuid from "uuid";
import { MemeAccess } from "../dataLayer/memesAccess";
import { MemeCategory } from "../models/MemeCategory";
import { MemeUpload } from "../models/MemeUpload";

const memeAccess = new MemeAccess();

export async function getAllMemes(userId: string): Promise<MemeCategory[]> {
  return memeAccess.getAllMemes(userId);
}

export async function addMeme(
  newMeme: MemeUpload,
  userId: string
): Promise<MemeCategory> {
  const memeId = uuid.v4();

  const url = `https://${process.env.IMAGES_S3_BUCKET}.s3.amazonaws.com/${memeId}`;

  //Check if Category exists already
  // IF exists, add the new image to it, update DB, return full Category
  // else just add it to the database
  const categoryExists = await memeAccess.categoryExist(
    userId,
    newMeme.category
  );

  if (categoryExists.length > 0) {
    const updatedCategory = categoryExists[0];
    updatedCategory.files.push(url);

    await memeAccess.updateFiles(updatedCategory);

    return updatedCategory;
  } else {
    return await memeAccess.createMemeCategory({
      userId,
      category: newMeme.category,
      files: [url],
    });
  }
}
