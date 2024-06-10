// components/RoomComponent.tsx
import React from "react";
import "./RoomComponent.css";

interface RoomProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
}

const RoomComponent: React.FC<RoomProps> = ({
  title,
  description,
  imageSrc,
  link,
}) => {
  return (
    <a href={link} className="room-container">
      <div className="room-image-container">
        <img src={imageSrc} alt="Room Image" className="room-image" />
      </div>
      <div className="room-text">
        <div className="room-title">{title}</div>
        <div className="room-description">{description}</div>
      </div>
    </a>
  );
};

export default RoomComponent;
