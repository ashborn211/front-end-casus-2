"use client";
import React, { useState, useEffect } from "react";
import { db } from "../FireBaseConfig";
import { collection, getDocs } from "firebase/firestore";
import UserComponent from "../components/UserComponent";
import Header from "../components/Header";
import "./users.css"; // Import CSS file

const Users = () => {
  const [usersData, setUsersData] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersDataArray: any[] = [];
        usersSnapshot.forEach((userDoc) => {
          usersDataArray.push(userDoc.data());
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
            link="#"
          />
        ))}
      </div>
    </main>
  );
};

export default Users;
