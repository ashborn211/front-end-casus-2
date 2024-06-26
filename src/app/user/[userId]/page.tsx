"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { auth, db } from "../../FireBaseConfig";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import Header from "../../components/Header";
import "../profile.css";
import withAuth from "../../components/withAuth";

const ProfilePage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [isFriend, setIsFriend] = useState(false);
  const [canViewProfile, setCanViewProfile] = useState(false);
  const params = useParams();
  const userId = params.userId as string;

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);

          // Check if the profile is public or if the current user is a friend
          if (data.privacy != "private") {
            setCanViewProfile(true);
          } else {
            checkIfFriend(data);
          }
        } else {
          console.error("User not found");
        }
      }
    };

    const checkIfFriend = async (data: any) => {
      if (auth.currentUser) {
        const currentUserId = auth.currentUser.uid as string;
        const currentUserDocRef = doc(db, "users", currentUserId);
        const currentUserDoc = await getDoc(currentUserDocRef);
        if (currentUserDoc.exists()) {
          const currentUserData = currentUserDoc.data();
          if (currentUserData.friends && currentUserData.friends.includes(userId)) {
            setIsFriend(true);
            setCanViewProfile(true);
          }
        }
      }
    };

    fetchUserData();
  }, [userId]);

  const handleAddFriend = async () => {
    if (auth.currentUser) {
      const currentUserId = auth.currentUser.uid as string;
      const currentUserDocRef = doc(db, "users", currentUserId);
      const otherUserDocRef = doc(db, "users", userId);

      try {
        await updateDoc(currentUserDocRef, {
          friends: arrayUnion(userId),
        });
        await updateDoc(otherUserDocRef, {
          friends: arrayUnion(currentUserId),
        });
        setIsFriend(true);
        setCanViewProfile(true);
      } catch (error) {
        console.error("Error updating friends:", error);
      }
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  if (!canViewProfile) {
    return <div>This profile is private.</div>;
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
        {!isFriend && <button onClick={handleAddFriend}>Add Friend</button>}
        {isFriend && <button disabled>Friend Added</button>}
      </div>
    </main>
  );
};

export default withAuth(ProfilePage);
