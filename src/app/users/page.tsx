// pages/Users.tsx
"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FireBaseConfig";
import UserComponent from "../components/UserComponent";
import Header from "../components/Header";
import { useRouter } from "next/navigation";
import "./users.css";

const Users = () => {
  const [usersData, setUsersData] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersDataArray: any[] = [];
        usersSnapshot.forEach((userDoc) => {
          usersDataArray.push({ id: userDoc.id, ...userDoc.data() });
        });
        setUsersData(usersDataArray);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    fetchUsersData();
  }, []);

  return (
    <main>
      <Header />
      <div className="user-container">
        {usersData.map((user: any, index: number) => (
          <UserComponent
            key={index}
            name={user.displayName}
            imageSrc={user.profilePicture}
            userId={user.id}
          />
        ))}
      </div>
    </main>
  );
};

export default Users;
