"use client";
import React, { useEffect, useState } from 'react';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../FireBaseConfig';
import Header from '../components/Header';
import "./boards.css"

interface Image {
  name: string;
  image: string;
  description: string; 
}

const descriptions: { [key: string]: string } = {
  "image1.png": "Description for image1",
  "image2.png": "Description for image2",
  "image3.png": "Description for image3",
  // Add more descriptions as needed
};

const UserComponent: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImagesFromStorage = async () => {
      const storageRef = ref(storage, 'board/'); // Reference to 'boards' folder in Firebase Storage
      try {
        const listResult = await listAll(storageRef);
        const imagePromises = listResult.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { 
            name: itemRef.name, 
            image: url, 
            description: descriptions[itemRef.name] || 'Default description' // Use the description mapping
          };
        });
        const fetchedImages = await Promise.all(imagePromises);
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error listing images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImagesFromStorage();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Header />
      <div className="container">
        {images.map((image) => (
          <div key={image.name} className="item">
            <img
              className='item-image'
              src={image.image}
              alt={image.name}
            />
            <h1>{image.description}</h1>
          </div>
        ))}
      </div>
    </main>
  );
};

export default UserComponent;
