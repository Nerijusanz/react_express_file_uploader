import React, { Fragment, useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("choose file");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChangeHandler = e => {
    const uploadFileObj = e.target.files[0];

    setFile(uploadFileObj);
    setFilename(uploadFileObj.name);
  };

  const onSubmitHandler = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: progressEvent => {
          let percents = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          percents = parseInt(percents, 10);

          setUploadPercentage(percents);

          // clear percentage
          // setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
    } catch (err) {
      const serverErrorMsg = `server error occurs`;
      const serverCustomErrorMsg = err.response.data.msg;

      const errorMsg =
        err.response.status === 500 ? serverErrorMsg : serverCustomErrorMsg;

      setMessage(errorMsg);
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmitHandler}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChangeHandler}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>

      {!uploadedFile ? null : (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default FileUpload;
