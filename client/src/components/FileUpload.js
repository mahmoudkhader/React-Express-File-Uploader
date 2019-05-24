// Since using hooks, will use functional components. Create functional arrow component with rafc
import React, { Fragment, useState } from "react";
// Bring axios in for http requests
import axios from "axios";
// Import the message component
import Message from "./Message";
// Import the progress bar component
import ProgressBar from "./ProgressBar";

const FileUpload = () => {
  // Create state. State should contain file that is selected, as well as it's filename. useState() is the method for using state hooks
  //   Before hooks, if you have the state object in a class, you first have to initialize the state in the state object {file:""}, and then call the function this.setState({file})
  //   With hooks, you call the initial value (file), and setFile (the updated file object, this replaces setState), and set them equal to useState(""), where you are initializing the file value
  const [file, setFile] = useState("");
  //   Initialize the filename state (which will be a label at first) as "Choose File"
  const [filename, setFilename] = useState("Choose File");
  // Initialize the uploadedFile state, which will be an object
  // Remember, the server is sending back a res.json with an object contianing the filename and filepath. That is what will return from the request and should be placed in that piece of state
  // res.json({fileName:file.name, filePath: `/uploads/${file.name}`})
  const [uploadedFile, setUploadedFile] = useState({});
  // Initialize the message state
  const [message, setMessage] = useState("");
  //   Initialize the upload percentage bar state
  const [uploadPercentage, setUploadPercentage] = useState(0);

  // Create onChange event
  const onChange = e => {
    //   Set the file state to the files that are selected, and since files is an array, select the first one in array position 0
    setFile(e.target.files[0]);
    // Set the filename by extractinv the name property form the above object
    setFilename(e.target.files[0].name);
  };

  //   Create onSubmit event (will use async await, since arrow function put right before event parameter)
  const onSubmit = async e => {
    e.preventDefault();
    // Send the file to the server using the FormDate() javascript method
    const formData = new FormData();
    // Take formData append the file object to it, which gets sent to the server as req.files.file
    // const file = req.files.file in server.js
    formData.append("file", file);

    // Wrap async funciton in try/catch
    // Try will make a request and send a response with an await
    try {
      // set the response to await and run the axios.post method, passing in the 'upload' url, the formData object, and an object containing the headers
      const res = await axios.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        },
        {
          // Upload progress
          onUploadProgress: progressEvent => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
            //   Clear percentage after ten seconds
            setTimeout(() => setUploadPercentage(0), 10000);
          }
        }
      );
      //   Will get res.data and will include the object send back by server.js. From that response, pull out the filename and filepath
      const { fileName, filePath } = res.data;
      //   Set the uploaded file to an object containing filename and filepath
      setUploadedFile({ fileName, filePath });
      // Set the message state to let hte user know the file uploaded successfully
      setMessage("File Uploaded");
    } catch (err) {
      // If errors exist, return the statuses. As defined in server.js, two error codes are 500 and 400
      //   if error code is 500, return the following text in a message
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
        setUploadPercentage(0);
      } else {
        //   If error code is 400, return the msg property that is sent
        setMessage(err.response.data.msg);
        setUploadPercentage(0);
      }
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        {message ? <Message msg={message} /> : null}
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {/* Choose file */}
            {/* Here, place the filename state */}
            {filename}
          </label>
        </div>
        {/* Progressbar takes in the uploadPerccentage as it's percentage prop */}
        <ProgressBar percentage={uploadPercentage} />
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {uploadedFile ? (
        <div className="row">
          <div className="col-md-6 m-">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
