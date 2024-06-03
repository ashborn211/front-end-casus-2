import Header from "../components/Header";
import "./chatrooms.css";
import Image from "next/image";
import "./images.png";
const chatrooms = () => {
  return (
    <main>
      <Header></Header>
      <div className="chatroom-container">
        <div className="room-container">
          <div className="room-image">
            <Image
              src="/images.png"
              alt="My Image Description"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="room-text">
            <div className="room-title">Dummy tekst</div>
            <div className="room-description">Chatroom description</div>
          </div>
        </div>
        <div className="room-container">
          <div className="room-image">
            <Image
              src="/images.png"
              alt="My Image Description"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="room-text">
            <div className="room-title">Dummy tekst</div>
            <div className="room-description">Chatroom description</div>
          </div>
        </div>
        <div className="room-container">
          <div className="room-image">
            <Image
              src="/images.png"
              alt="My Image Description"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="room-text">
            <div className="room-title">Dummy tekst</div>
            <div className="room-description">Chatroom description</div>
          </div>
        </div>
        <div className="room-container">
          <div className="room-image">
            <Image
              src="/images.png"
              alt="My Image Description"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="room-text">
            <div className="room-title">Dummy tekst</div>
            <div className="room-description">Chatroom description</div>
          </div>
        </div>
        <div className="room-container">
          <div className="room-image">
            <Image
              src="/images.png"
              alt="My Image Description"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="room-text">
            <div className="room-title">Dummy tekst</div>
            <div className="room-description">Chatroom description</div>
          </div>
        </div>
        <div className="room-container">
          <div className="room-image">
            <Image
              src="/images.png"
              alt="My Image Description"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="room-text">
            <div className="room-title">Dummy tekst</div>
            <div className="room-description">Chatroom description</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default chatrooms;
