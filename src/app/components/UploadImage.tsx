"use client";

import { useState, ChangeEvent } from "react";
import { uploadImageAndCreatePost } from "./uploadImageAndLinkToPost";
import { auth } from "../FireBaseConfig";

const UploadImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>(true); // Default to public post

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImageUrl("");
    }
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setFile(null);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handlePrivacyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsPublic(e.target.value === 'public');
  };

  const handleUpload = async () => {
    if ((file || imageUrl) && content) {
      try {
        const data = file ? file : imageUrl;
        const userId = auth.currentUser ? auth.currentUser.uid : null; // Get current user ID
        if (userId) {
          await uploadImageAndCreatePost(data, content, userId, isPublic); // Pass user ID and privacy flag to upload function
          // alert('Post created successfully');
        } else {
          alert('User not authenticated');
        }
      } catch (error) {
        alert("Failed to create post");
        // console.error("Error creating post:", error);
      }
    } else {
      alert("Please select a file or provide an image URL, and enter content.");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleUpload();
      }}
    >
      <h1>Create Post</h1>
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder="Image URL" value={imageUrl} onChange={handleUrlChange} />
      <textarea placeholder="Enter content" value={content} onChange={handleContentChange}></textarea>
      <select value={isPublic ? 'public' : 'private'} onChange={handlePrivacyChange}>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default UploadImage;
