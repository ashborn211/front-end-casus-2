import "./componentStyles.css";
import Link from "next/link"; // Import Link from Next.js

export default function Header() {
  // Mock user data (replace with actual user data)
  const user = {
    id: "userId123",
    username: "exampleUser",
  };

  return (
    <header>
      <div className="logo">
        <h1>MyChan</h1>
        <p>~ World's best</p>
      </div>
      <nav>
        <div className="links">
          <Link href={`/home`} className="navLink">
            Home
          </Link>
          <Link href={`/rooms`} className="navLink">
            Chatrooms
          </Link>
          <Link href={`/users`} className="navLink">
            Users
          </Link>
          <Link href={`/posts`} className="navLink">
            Top posts
          </Link>
          <Link href={`/boards`} className="navLink">
            Boards
          </Link>
          <Link href={`/user`} className="navLink">
            account
          </Link>
        </div>
        <div className="search">
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.2461 0C12.3199 0 7.49764 4.82125 7.49764 10.7508C7.49764 12.17 7.78765 13.5158 8.28701 14.7547L0 23.0423L5.95425 29L14.2449 20.706C15.4838 21.209 16.8296 21.499 18.2452 21.499C24.175 21.499 29 16.6777 29 10.7517C29.0009 4.82125 24.1759 0 18.2461 0ZM18.2461 17.8776C14.3201 17.8776 11.12 14.6776 11.12 10.7517C11.12 6.82225 14.3201 3.62228 18.2461 3.62228C22.1793 3.62228 25.3794 6.82225 25.3794 10.7517C25.3794 14.6767 22.1793 17.8776 18.2461 17.8776Z"
              fill="white"
            />
          </svg>

          <input className="search-bar" type="text" placeholder="Search..." />
        </div>
      </nav>
    </header>
  );
}
