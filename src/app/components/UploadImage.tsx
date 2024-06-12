"use client";

// components/UploadImage.tsx
import { useState, ChangeEvent } from 'react';
import { uploadImageAndCreatePost } from './uploadImageAndLinkToPost';

const UploadImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImageUrl('');
    }
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setFile(null);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleUpload = async () => {
    if ((file || imageUrl) && content) {
      try {
        const data = file ? file : imageUrl;
        await uploadImageAndCreatePost(data, content);
        alert('Post created successfully');
      } catch (error) {
        alert('Failed to create post');
        console.error('Error creating post:', error);
      }
    } else {
      alert('Please select a file or provide an image URL, and enter content.');
    }
  };

  return (
    <form className='upload-form' onSubmit={(e) => { e.preventDefault(); handleUpload(); }}>
      <h1>Create Post</h1>
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder="Image URL" value={imageUrl} onChange={handleUrlChange} />
      <textarea placeholder="Enter content" value={content} onChange={handleContentChange}></textarea>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default UploadImage;