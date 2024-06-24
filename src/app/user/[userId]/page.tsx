"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { auth, db } from "../../FireBaseConfig";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import Header from "../../components/Header";
import "../profile.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [isFriend, setIsFriend] = useState(false);
  const params = useParams();
  const userId = params.userId as string;

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        console.log(`Fetching data for userId: ${userId}`);
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.error("User not found");
        }
      }
    };

    const checkIfFriend = async () => {
      if (auth.currentUser) {
        const currentUserId = auth.currentUser.uid as string;
        console.log(`Current user ID: ${currentUserId}`);
        const currentUserDocRef = doc(db, "users", currentUserId);
        const currentUserDoc = await getDoc(currentUserDocRef);
        if (currentUserDoc.exists()) {
          const currentUserData = currentUserDoc.data();
          if (currentUserData.friends && currentUserData.friends.includes(userId)) {
            setIsFriend(true);
          }
        }
      }
    };

    fetchUserData();
    checkIfFriend();
  }, [userId]);

  const handleAddFriend = async () => {
    if (auth.currentUser) {
      const currentUserId = auth.currentUser.uid as string;
      const currentUserDocRef = doc(db, "users", currentUserId);
      const otherUserDocRef = doc(db, "users", userId);

      // Perform both updates as a batch
      try {
        await updateDoc(currentUserDocRef, {
          friends: arrayUnion(userId),
        });
        await updateDoc(otherUserDocRef, {
          friends: arrayUnion(currentUserId),
        });
        setIsFriend(true);
      } catch (error) {
        console.error("Error updating friends:", error);
      }
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Header />
      <div className="profile-container">
        <h1>Profile Page</h1>
        <img
          src={userData.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
        <h2>{userData.displayName}</h2>
        {!isFriend && (
          <button onClick={handleAddFriend}>Add Friend</button>
        )}
        {isFriend && (
          <button disabled>Friend Added</button>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;