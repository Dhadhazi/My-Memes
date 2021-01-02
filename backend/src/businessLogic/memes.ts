import * as uuid from "uuid";
import { MemeAccess } from "../dataLayer/memesAccess";
import { MemeItem } from "../models/MemeItem";

const memeAccess = new MemeAccess();

export async function getAllTodos(userId: string): Promise<MemeItem[]> {
  return memeAccess.getAllMemes(userId);
}
