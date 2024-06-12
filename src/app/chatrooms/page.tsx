"use client";

import Header from "../components/Header";
import "./chatrooms.css";
import RoomComponent from "../components/RoomComponent";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../FireBaseConfig";
import withAuth from "../components/withAuth";

interface Room {
  description: string;
  image: string;
  link: string;
  title: string;
}

const Chatrooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomDocsPromises = Array.from({ length: 6 }, (_, index) => {
          const roomDocRef = doc(db, "chatrooms", `room${index + 1}`);
          return getDoc(roomDocRef);
        });

        const roomDocsSnapshots = await Promise.all(roomDocsPromises);

        const fetchedRoomsPromises = roomDocsSnapshots.map(
          async (roomDocSnapshot, index) => {
            if (roomDocSnapshot.exists()) {
              const roomData = roomDocSnapshot.data() as Room;
              try {
                const imageRef = ref(
                  storage,
                  `chatrooms/images/image${index + 1}.png`
                );
                const imageURL = await getDownloadURL(imageRef);
                roomData.image = imageURL;
              } catch (error) {
                console.error(
                  `Error fetching image URL for room${index + 1}:`,
                  error
                );
                roomData.image = ""; // Fallback or default image URL can be set here
              }
              return roomData;
            } else {
              console.log(`Room 'room${index + 1}' does not exist.`);
              return null;
            }
          }
        );

        const fetchedRooms = await Promise.all(fetchedRoomsPromises);
        setRooms(fetchedRooms.filter((room) => room !== null) as Room[]);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <main>
      <Header />
      <div className="chatroom-container">
        {rooms.map((room, index) => (
          <RoomComponent
            key={index}
            title={room.title}
            description={room.description}
            imageSrc={room.image}
            link={room.link}
          />
        ))}
      </div>
    </main>
  );
};

export default withAuth(Chatrooms);
