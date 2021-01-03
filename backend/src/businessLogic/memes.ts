import * as uuid from "uuid";
import { MemeAccess } from "../dataLayer/memesAccess";
import { MemeCategory } from "../models/MemeCategory";

const memeAccess = new MemeAccess();

export async function getAllTodos(userId: string): Promise<MemeCategory[]> {
  return memeAccess.getAllMemes(userId);
}
