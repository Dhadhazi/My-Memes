import React, { useState } from "react";
import { getUploadUrl } from "../api/memeapi";

export const UploadMeme = () => {
  const [file, setFile] = useState<any>();
  const [category, setCategory] = useState<string>();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) return;
    setFile(files[0]);
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

    console.log(event);
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
