"use client";
import '../components/componentStyles.css';
import PostsComponent from "../components/PostDisplay";
import withAuth from "../components/withAuth";

const upload = () => {
  return (
    <div>
      <h1>Upload Page</h1>
      <PostsComponent />
    </div>
  );
};


export default withAuth(upload);
