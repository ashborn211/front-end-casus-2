import React, { useState } from 'react';
import { auth, db } from "../FireBaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const PrivacyToggle: React.FC<{ currentPrivacy: string, userId: string }> = ({ currentPrivacy, userId }) => {
  const [privacy, setPrivacy] = useState(currentPrivacy);

  const handlePrivacyChange = async (newPrivacy: string) => {
    setPrivacy(newPrivacy);
    if (auth.currentUser) {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { privacy: newPrivacy });
    }
  };

  return (
    <div className="privacy-toggle">
      <label>Account Privacy: </label>
      <select value={privacy} onChange={(e) => handlePrivacyChange(e.target.value)}>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
    </div>
  );
};

export default PrivacyToggle;
