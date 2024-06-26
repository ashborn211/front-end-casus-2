"use client";
import "../components/componentStyles.css";
import PostsComponent from "../components/PostDisplay";
import withAuth from "../components/withAuth";
import Header from "../components/Header";
import "../home/home.css";

const upload = () => {
  return (
    <main>
      <Header></Header>

      <div className="post-container">
        <PostsComponent />
      </div>
    </main>
  );
};

export default withAuth(upload);
