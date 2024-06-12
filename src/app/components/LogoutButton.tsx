// src/components/LogoutButton.tsx

import React from "react";
import { useRouter } from "next/navigation";
import { auth } from "../FireBaseConfig";
import "./componentStyles.css";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
