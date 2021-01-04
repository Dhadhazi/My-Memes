import React, { useState, useEffect } from "react";
import { getAllMemes } from "../api/memeapi";
import { useAuth0 } from "../lib/auth0-spa";
import { MemeCategory } from "../types/MemeCategory";
import styles from "./Display.module.css";

export default function Display() {
  const auth = useAuth0();
  const [memes, setMemes] = useState<MemeCategory[]>();
  const [category, setCategory] = useState<string>("All");

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

  useEffect(() => {
    async function initialLoad() {
      const allMeme = await loadMemes();
      setMemes(allMeme);
    }
    initialLoad();
  }, []);

  return (
    <div>
      Select Categor:
      <select onChange={handleCategorySelect}>
        <option value="All">All</option>
        {memes
          ? memes.map((meme: MemeCategory, index: number) => (
              <option value={meme.category} key={`categorySelector-${index}`}>
                {meme.category}
              </option>
            ))
          : ""}
      </select>
      {memes
        ? memes
            .filter((meme) =>
              category !== "All" ? meme.category === category : true
            )
            .map((meme: MemeCategory, index: number) => (
              <div key={`categorydiv-${index}`}>
                <h3 className={styles.title}>{meme.category}</h3>
                <div className={styles.memesMainBox}>
                  {meme.files.map((img: string) => (
                    <div className={styles.imageDiv}>
                      <img src={img} className={styles.memeImg} key={img} />
                      <button>Archive</button>
                      <button>Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            ))
        : "Please upload some memes"}
    </div>
  );
}
