// components/uploadImageAndLinkToPost.ts
import { storage, db } from '../FireBaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

export const uploadImageAndCreatePost = async (data: File | string, content: string, userId: string): Promise<void> => {
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

    // Create a new Firestore document with auto-generated ID
    await addDoc(collection(db, 'posts'), {
      imageUrl: downloadURL,
      content: content,
      userId: userId,
      createdAt: Timestamp.now()
    });

    console.log('Post created successfully.');
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
