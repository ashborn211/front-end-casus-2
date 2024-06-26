"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth, db } from "../../FireBaseConfig";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import Header from "../../components/Header";
import Head from "next/head";
import "../profile.css";
import withAuth from "../../components/withAuth";

const ProfilePage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [friendsData, setFriendsData] = useState<any[]>([]);
  const [customCss, setCustomCss] = useState<string | null>(null);
  const [isFriend, setIsFriend] = useState(false);
  const [canViewProfile, setCanViewProfile] = useState(false);
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserData(userData);

          if (userData.customCss) {
            setCustomCss(userData.customCss);
          } else {
            setCustomCss(null);
          }

          if (userData.privacy !== "private") {
            setCanViewProfile(true);
          } else {
            checkIfFriend(userData);
          }

          if (userData.friends && userData.friends.length > 0) {
            const friendsPromises = userData.friends.map(
              async (friendId: string) => {
                const friendDocRef = doc(db, "users", friendId);
                const friendDoc = await getDoc(friendDocRef);
                if (friendDoc.exists()) {
                  return friendDoc.data();
                }
                return null;
              }
            );

            const friendsData = await Promise.all(friendsPromises);
            setFriendsData(friendsData.filter((friend) => friend !== null));
          }
        } else {
          console.error("User not found");
        }
      }
    };

    const checkIfFriend = async (userData: any) => {
      if (auth.currentUser) {
        const currentUserId = auth.currentUser.uid as string;
        const currentUserDocRef = doc(db, "users", currentUserId);
        const currentUserDoc = await getDoc(currentUserDocRef);
        if (currentUserDoc.exists()) {
          const currentUserData = currentUserDoc.data();
          if (
            currentUserData.friends &&
            currentUserData.friends.includes(userId)
          ) {
            setIsFriend(true);
            setCanViewProfile(true);
          }
        }
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    if (customCss) {
      const styleTag = document.createElement("style");
      styleTag.textContent = customCss;
      document.head.appendChild(styleTag);

      return () => {
        document.head.removeChild(styleTag);
      };
    }
  }, [customCss]);

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
      <Head>
        <style>{customCss || ""}</style>
      </Head>
      <Header />

      <div className="account-container">
        <div className="profile-info">
          <div className="profile-box">
            <div className="avatar-box">
              <h2>{userData.displayName}</h2>
              <img
                src={userData.profilePicture}
                alt="Profile"
                className="profile-picture"
              />
              {!isFriend && (
                <button onClick={handleAddFriend}>Add Friend</button>
              )}
              {isFriend && <button disabled>Friend Added</button>}
            </div>
          </div>
          <div className="profile-description-box">
            <div className="profile-description-title">
              <h3>Description</h3>
            </div>
            <div className="profile-description">
              <p>{userData.description}</p>
            </div>
          </div>
          <div className="friends-box">
            <div className="boxname">
              <h3>Friends</h3>
            </div>
            <div className="friends">
              {friendsData.length > 0 ? (
                friendsData.map((friend, index) => (
                  <p key={index}>{friend.displayName}</p>
                ))
              ) : (
                <p>No friends found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default withAuth(ProfilePage);
