import * as uuid from "uuid";
import { BucketAccess } from "../dataLayer/bucketAccess";
import { MemeAccess } from "../dataLayer/memesAccess";
import { MemeCategory } from "../models/MemeCategory";
import { MemeUpload } from "../models/MemeUpload";

const memeAccess = new MemeAccess();
const bucketAccess = new BucketAccess();

export async function getAllMemes(userId: string): Promise<MemeCategory[]> {
  return memeAccess.getAllMemes(userId);
}

export async function deleteCategory(userId: string, categoryId: string) {
  return memeAccess.deleteCategory(userId, categoryId);
}

export async function addMeme(
  newMeme: MemeUpload,
  userId: string
): Promise<MemeCategory> {
  const memeId = uuid.v4();

  const url = `https://${process.env.IMAGES_S3_BUCKET}.s3.amazonaws.com/${memeId}`;

  const getCategory = await memeAccess.getOneCategory(
    userId,
    newMeme.categoryId
  );

  const updatedCategory = getCategory[0];
  updatedCategory.files.push(url);

  await memeAccess.updateCategory(updatedCategory);

  return updatedCategory;
}

export async function updateCategory(
  updatedCategory: MemeCategory
): Promise<MemeCategory> {
  await memeAccess.updateCategory(updatedCategory);

  return updatedCategory;
}

export async function createCategory(
  newMeme: MemeUpload,
  userId: string
): Promise<MemeCategory> {
  const memeId = uuid.v4();
  const categoryId = uuid.v4();

  const url = `https://${process.env.IMAGES_S3_BUCKET}.s3.amazonaws.com/${memeId}`;

  return await memeAccess.createMemeCategory({
    userId,
    categoryId,
    category: newMeme.category,
    files: [url],
  });
}

export async function getUploadUrl(memeId: string) {
  return await bucketAccess.getUploadUrl(memeId);
}
