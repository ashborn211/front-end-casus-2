// src/app/ProfilePage.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../FireBaseConfig";
import { doc, getDoc } from "firebase/firestore";

const ProfilePage = () => {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) {
        router.push("/login");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.error("No such document!");
          router.push("/home");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/home");
      }
    };

    fetchUserData();
  }, [router]);

  if (!auth.currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        {userData ? (
          <div className="mb-4">
            <label className="block text-gray-700">Profile Picture</label>
            <img
              src={userData.profilePicture}
              alt="Profile Picture"
              className="w-20 h-20 rounded-full mb-4"
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
