import React from "react";
import "./UserComponent.css";

interface UserProps {
  name: string;
  imageSrc: string;
  link: string;
}

const UserComponent: React.FC<UserProps> = ({ name, imageSrc, link }) => {
  return (
    <a href={link} className="user-item">
      <div className="user-name">{name}</div>
      <div className="user-image-container">
        <img src={imageSrc} alt="Room Image" className="room-image" />
      </div>
    </a>
  );
};

export default UserComponent;
