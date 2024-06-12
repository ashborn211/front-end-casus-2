"use client";
import '../components/componentStyles.css';
import UploadImage from "../components/UploadImage";
import withAuth from "../components/withAuth";

const upload = () => {
  return (
    <div>
      <h1>Upload Page</h1>
      <UploadImage />
    </div>
  );
};

export default withAuth(upload);