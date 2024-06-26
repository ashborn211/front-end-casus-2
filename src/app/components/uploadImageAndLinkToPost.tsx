import { storage, db } from "../FireBaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, Timestamp, collection } from "firebase/firestore";

export const uploadImageAndCreatePost = async (
  data: File | string,
  content: string,
  userId: string,
  isPublic: boolean
): Promise<void> => {
  try {
    // Generate a random ID using Firestore's collection method
    const newPostRef = doc(collection(db, "posts"));
    const postId = newPostRef.id;
    let downloadURL: string;

    if (typeof data === "string") {
      downloadURL = data;
    } else {
      const storageRef = ref(storage, `images/${postId}`);
      const snapshot = await uploadBytes(storageRef, data);
      downloadURL = await getDownloadURL(snapshot.ref);
    }

    await setDoc(newPostRef, {
      imageUrl: downloadURL,
      content: content,
      createdAt: Timestamp.now(),
      userId: userId,
      isPublic: isPublic, 
      likes: 0, 
      dislikes: 0, 
    });

    // console.log("Post created successfully.");
  } catch (error) {
    // console.error("Error creating post:", error);
    throw error;
  }
};
