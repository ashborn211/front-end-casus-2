"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../FireBaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import "./profile.css";
import Header from "../components/Header";
import Head from "next/head";

const ProfilePage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [friendsData, setFriendsData] = useState<any[]>([]);
  const [customCss, setCustomCss] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const router = useRouter();

  const fetchUserData = async () => {
    if (auth.currentUser) {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserData(userData);

        if (userData.customCss) {
          setCustomCss(userData.customCss);
        }

        // Fetch friends' data
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
      }
    } else {
      router.push("/");
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const cssContent = e.target?.result as string;
        if (auth.currentUser) {
          const userDocRef = doc(db, "users", auth.currentUser.uid);
          await updateDoc(userDocRef, { customCss: cssContent });
          setCustomCss(cssContent); // Update the state with the new CSS content
          alert("CSS file uploaded successfully!");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleEditDescription = () => {
    setIsEditing(true);
    setNewDescription(userData.description);
  };

  const handleSaveDescription = async () => {
    if (auth.currentUser) {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, { description: newDescription });
      setUserData({ ...userData, description: newDescription });
      setIsEditing(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [router]);

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

  if (!userData) {
    return <div>Loading...</div>;
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
              <p>Add friend!</p>
            </div>
          </div>
          <div className="profile-description-box">
            <div className="profile-description-title">
              <p>{userData.displayName}'s description:</p>
            </div>
            <div className="profile-description">
              {isEditing ? (
                <div>
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    rows={4}
                    cols={50}
                  />
                  <button onClick={handleSaveDescription}>Save</button>
                </div>
              ) : (
                <div>
                  <p>{userData.description}</p>
                  <button onClick={handleEditDescription}>
                    Edit description!
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="friends-box">
            <div className="boxname">
              <p>{userData.displayName}'s friends</p>
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
          <div className="upload-css-box">
            <button className="upload-css-button">Upload CSS</button>
            <input
              type="file"
              accept=".css"
              onChange={handleFileUpload}
              className="upload-css-input"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
