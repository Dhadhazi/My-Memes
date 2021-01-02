import React, { useState } from "react";
import { getUploadUrl } from "../api/memeapi";

export const UploadMeme = () => {
  const [file, setFile] = useState<any>();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) return;
    setFile(files[0]);
  }

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    if (!file) {
      alert("File should be selected!");
      return;
    }
  }

  return (
    <div>
      <h3>Upload new meme</h3>
      <form onSubmit={handleSubmit}>
        <label>File: </label>
        <input
          type="file"
          accept="image/*"
          placeholder="Image to upload"
          onChange={handleFileChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
