import React, { useState } from "react";
import axios from "axios";

export default function UploadeFile() {
  const [file, setFiles] = useState({
    fileName: "",
  });

  const handleSubmit = () => {
    if (file.fileName !== "") {
      const formData = new FormData();
      formData.append("file", file.fileName);
      axios
        .post("http://localhost:4000/user/uploadFile",formData).then((res) => {
          console.log(res.data);
          setFiles({
            fileName: "",
          })
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="container mt-5">
      <div className="text-primary text-center">UploadeFile</div>

      <input
        type="file"
        className="form-control"
        // value={file.fileName}
        onChange={(e) => {
          setFiles({ ...file, fileName: e.target.files[0] });
        }}
      />
      <button className="btn btn-info text-white mx-2" onClick={handleSubmit}>
        UploadeFile
      </button>
    </div>
  );
}
