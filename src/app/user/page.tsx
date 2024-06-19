"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../FireBaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import "./profile.css";
import Header from "../components/Header";

const ProfilePage = () => {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        router.push("/");
      }
    };

    fetchUserData();
  }, [router]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Header></Header>

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
