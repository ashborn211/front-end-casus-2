// components/uploadImageAndLinkToPost.ts
import { storage, db } from '../FireBaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';

const getNextPostId = async (): Promise<number> => {
  const counterDoc = doc(db, 'counters', 'postCounter');
  const counterSnapshot = await getDoc(counterDoc);

  let nextId = 1;
  if (counterSnapshot.exists()) {
    const data = counterSnapshot.data();
    nextId = data.currentId + 1;
  }

  //voor de counter
  await setDoc(counterDoc, { currentId: nextId });
  return nextId;
};

const initializeCounter = async () => {
  await setDoc(doc(db, 'counters', 'postCounter'), { currentId: 0 });
};
initializeCounter().then(() => console.log('Counter initialized')).catch(console.error);



export const uploadImageAndCreatePost = async (data: File | string, content: string): Promise<void> => {
  try {
    const postId = await getNextPostId();
    const postIdStr = `post${postId}`;
    let downloadURL: string;

    if (typeof data === 'string') {
      // Use provided image URL directly
      downloadURL = data;
    } else {
      // Upload the image to Firebase Storage with the post ID
      const storageRef = ref(storage, `images/${postIdStr}`);
      const snapshot = await uploadBytes(storageRef, data);
      downloadURL = await getDownloadURL(snapshot.ref);
    }

    // Create a new Firestore document with the post ID
    await setDoc(doc(db, 'posts', postIdStr), {
      imageUrl: downloadURL,
      content: content,
      createdAt: Timestamp.now()
    });

    console.log('Post created successfully.');
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};