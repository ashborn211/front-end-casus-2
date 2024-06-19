import React from 'react';
import Link from 'next/link';

interface UserComponentProps {
  name: string;
  imageSrc: string;
  userId: string;
}

const UserComponent: React.FC<UserComponentProps> = ({ name, imageSrc, userId }) => {
  return (
    <div className="user-component">
      <img src={imageSrc} alt={name} />
      <h3>{name}</h3>
      <Link href={`/user/${userId}`}>
        <h1>View Profile</h1>
      </Link>
    </div>
  );
};

export default UserComponent;
