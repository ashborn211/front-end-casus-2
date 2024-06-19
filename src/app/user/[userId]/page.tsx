"use client";
// pages/user/[userId]/page.tsx
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../FireBaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Header from "../../components/Header";
import "../profile.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState<any>(null);
  const { userId } = useParams<{ userId: string }>(); // Destructure userId from useParams

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const userDocRef = doc(db, "users", userId); // Ensure userId is treated as string
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.error("User not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [userId]); // Add userId to dependency array for useEffect

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
      </div>
    </main>
  );
};

export default ProfilePage;
