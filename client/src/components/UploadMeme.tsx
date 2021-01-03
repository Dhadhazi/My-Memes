import React, { useState } from "react";
import { addMeme } from "../api/memeapi";
import { useAuth0 } from "../lib/auth0-spa";

export const UploadMeme = () => {
  const [file, setFile] = useState<any>();
  const [category, setCategory] = useState<string>("");
  const auth = useAuth0();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) return;
    setFile(files[0]);
  }

  async function getIdToken() {
    const token = await auth.getIdTokenClaims();
    return token.__raw;
  }

  function handleCategoryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCategory(e.target.value);
  }

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    if (!file) {
      alert("File should be selected!");
      return;
    }
    if (category.length < 3) {
      alert("Category must be at least 3 charactes");
      return;
    }
    const idToken = await getIdToken();

    const meme = {
      category,
      file,
    };
    const res = await addMeme(idToken, meme);
    console.log(res);
  }

  return (
    <div>
      <h3>Add New Meme</h3>
      <form onSubmit={handleSubmit}>
        Add a category:{" "}
        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleCategoryChange}
          value={category}
        />
        <br />
        <label>File: </label>
        <input
          name="file"
          type="file"
          accept="image/*"
          placeholder="Image to upload"
          onChange={handleFileChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
