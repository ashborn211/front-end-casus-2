"use client";
import "../components/componentStyles.css";
import Header from "../components/Header";
import UploadImage from "../components/UploadImage";
import withAuth from "../components/withAuth";

const upload = () => {
  return (
    <main>
    <div>
      <Header />
      <h1>Upload Page</h1>
      <UploadImage />
    </div>
    </main>
  );
};

export default withAuth(upload);
