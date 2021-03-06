import React, { useState, useEffect } from "react";
import { deleteCategory, getAllMemes, updateCategory } from "../api/memeapi";
import { useAuth0 } from "../lib/auth0-spa";
import { MemeCategory } from "../types/MemeCategory";
import styles from "./Display.module.css";
import { UploadMeme } from "./UploadMeme";

export default function Display() {
  const auth = useAuth0();
  const [memes, setMemes] = useState<MemeCategory[]>();
  const [category, setCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);

  function toggleLoading() {
    setLoading((prevState) => !prevState);
  }

  async function getIdToken(): Promise<string> {
    const token = await auth.getIdTokenClaims();
    return token.__raw;
  }

  async function loadMemes(): Promise<MemeCategory[]> {
    const token = await getIdToken();
    const allMeme = await getAllMemes(token);
    return allMeme;
  }

  function handleCategorySelect(e) {
    setCategory(e.target.value);
  }

  async function handleDeleteMeme(image, categoryId) {
    toggleLoading();
    const selectedCategory = memes.filter(
      (meme) => meme.categoryId === categoryId
    );
    const updatedCategory = selectedCategory[0];
    updatedCategory.files = updatedCategory.files.filter(
      (file) => file !== image
    );

    const token = await getIdToken();
    await updateCategory(token, updatedCategory);
    toggleLoading();
  }

  async function handleDeleteCategory(categoryId) {
    toggleLoading();
    const token = await getIdToken();
    await deleteCategory(token, categoryId);
    toggleLoading();
  }

  async function updateMemesFromServer() {
    const allMeme = await loadMemes();
    setMemes(allMeme);
  }

  useEffect(() => {
    async function initialLoad() {
      await updateMemesFromServer();
    }
    initialLoad();
    setLoading(false);
  }, [loading]);

  if (loading) {
    return <img src="/loading.svg" />;
  }

  return (
    <div>
      <div className={styles.menuBox}>
        <UploadMeme toggleLoading={toggleLoading} memes={memes} />
        <div className={styles.categoryBox}>
          Sort for category:
          <select onChange={handleCategorySelect}>
            <option value="All">All</option>
            {memes
              ? memes.map((meme: MemeCategory, index: number) => (
                  <option
                    value={meme.category}
                    key={`categorySelector-${index}`}
                  >
                    {meme.category}
                  </option>
                ))
              : ""}
          </select>
        </div>
      </div>
      {memes
        ? memes
            .filter((meme) =>
              category !== "All" ? meme.category === category : true
            )
            .map((meme: MemeCategory, index: number) => (
              <div key={`categorydiv-${index}`}>
                <div className={styles.titleBox}>
                  <h3 className={styles.title}>{meme.category}</h3>
                  <button onClick={() => handleDeleteCategory(meme.categoryId)}>
                    Delete Category
                  </button>
                </div>
                <div className={styles.memesMainBox}>
                  {meme.files.map((img: string) => (
                    <div className={styles.imageDiv} key={img}>
                      <img src={img} className={styles.memeImg} />
                      <button
                        onClick={() => handleDeleteMeme(img, meme.categoryId)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
        : "Please upload some memes"}
    </div>
  );
}
