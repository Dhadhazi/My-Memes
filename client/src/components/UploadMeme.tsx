import React, { useState } from "react";
import { addMeme, getUploadUrl, uploadFile } from "../api/memeapi";
import { useAuth0 } from "../lib/auth0-spa";
import { MemeCategory } from "../types/MemeCategory";
import styles from "./UploadMeme.module.css";

type Props = {
  toggleLoading: Function;
  memes: MemeCategory[];
};

type Category = {
  name: string;
  id: string;
};

export const UploadMeme = ({ toggleLoading, memes }: Props) => {
  const [file, setFile] = useState<any>();
  const [category, setCategory] = useState<Category>({ name: "", id: "" });
  const [createDisabled, setCreateDisabled] = useState<boolean>(false);
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

  function getCategoryNameFromId(categoryId) {
    const meme = memes.filter((meme) => meme.categoryId === categoryId);
    return meme[0].category;
  }

  function handleCategoryInput(e: React.ChangeEvent<HTMLInputElement>) {
    setCategory({ name: e.target.value, id: "" });
  }

  function handleChooseCategoryRadio(e) {
    setCreateDisabled(true);
    const categoryId = e.target.value;
    const categoryName = getCategoryNameFromId(categoryId);
    setCategory({ name: categoryName, id: categoryId });
  }

  function handleCreateRadioButton() {
    setCreateDisabled(false);
  }

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    if (!file) {
      alert("File should be selected!");
      return;
    }
    if (category.name.length < 3) {
      alert("Category name must be at least 3 charactes");
      return;
    }
    toggleLoading();
    const idToken = await getIdToken();

    const meme = {
      categoryId: category.id.length > 15 ? category.id : "",
      category: category.name,
      file,
    };

    const res = await addMeme(idToken, meme);
    const memeArray = res.files[res.files.length - 1].split("/");
    const memeId = memeArray[memeArray.length - 1];
    const uploadUrl = await getUploadUrl(idToken, memeId);
    await uploadFile(uploadUrl, file);
    setFile("");
    setCategory({ name: "", id: "" });
    toggleLoading();
  }

  return (
    <div>
      <h3>Add New Meme</h3>
      <form onSubmit={handleSubmit}>
        {/* RADIO */}
        <div className={styles.categoryMainBox}>
          Choose or create a category:
          {memes
            ? memes.map((meme: MemeCategory, index: number) => (
                <div className={styles.radioChooseBox}>
                  <input
                    type="radio"
                    name="chooseCategoryRadio"
                    id={meme.categoryId}
                    value={meme.categoryId}
                    key={meme.categoryId}
                    checked={category.id === meme.categoryId}
                    onChange={(e) => handleChooseCategoryRadio(e)}
                  />
                  <label htmlFor={meme.categoryId}>{meme.category}</label>
                </div>
              ))
            : ""}
          <div
            className={styles.radioInputBox}
            onClick={() => handleCreateRadioButton()}
          >
            <input
              type="radio"
              name="chooseCategoryRadio"
              value="CREATE"
              id="CreateCategory"
              onChange={() => handleCreateRadioButton()}
              checked={!createDisabled}
            />
            <input
              type="text"
              name="category"
              placeholder="Create Category"
              onChange={handleCategoryInput}
              value={category.name}
              disabled={createDisabled}
              className={styles.categoryInput}
            />
          </div>
        </div>
        {/* END OF RADIO */}
        <br />
        <div className={styles.fileUploadBox}>
          <label>File: </label>
          <input
            name="file"
            type="file"
            accept="image/*"
            placeholder="Image to upload"
            onChange={handleFileChange}
          />{" "}
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};
