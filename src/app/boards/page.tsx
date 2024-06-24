"use client";
import React, { useEffect, useState } from 'react';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../FireBaseConfig';
import Header from '../components/Header';
import "./boards.css"


interface Image {
  name: string;
  url: string;
}

const UserComponent: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImagesFromStorage = async () => {
      const storageRef = ref(storage, 'board/'); // Reference to 'boards' folder in Firebase Storage
      try {
        const listResult = await listAll(storageRef);
        const downloadURLs = await Promise.all(
          listResult.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return { name: itemRef.name, url };
          })
        );
        setImages(downloadURLs);
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
<div>
<Header></Header>
<div className="container">
      {images.map((image) => (
        <div key={image.name} className="item">
          <img
          className='item'
            src={image.url}
            alt={image.name}
            
          />
        </div>
      ))}
    </div>
    
    </div>
    </main>
  );
};

export default UserComponent;
