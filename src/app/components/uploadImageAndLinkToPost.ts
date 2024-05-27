// components/uploadImageAndLinkToPost.ts
import { storage, firestore } from '../FireBase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

interface PostData {
  imageUrl: string;
  content: string;
}

export const uploadImageAndCreatePost = async (data: File | string, content: string): Promise<void> => {
  try {
    let downloadURL: string;

    if (typeof data === 'string') {
      // Use provided image URL directly
      downloadURL = data;
    } else {
      // Upload the image to Firebase Storage
      const storageRef = ref(storage, `images/${data.name}`);
      const snapshot = await uploadBytes(storageRef, data);
      downloadURL = await getDownloadURL(snapshot.ref);
    }

    // Create a new Firestore document with an auto-generated ID
    const postDocRef = await addDoc(collection(firestore, 'posts'), {
      imageUrl: downloadURL,
      content: content,
      createdAt: Timestamp.now()
    });

    console.log('Post created in Firestore with ID:', postDocRef.id);
  } catch (error) {
    console.error('Error creating post in Firestore:', error);
    throw error;
  }
};
