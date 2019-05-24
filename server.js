const express = require("express");
const fileUpload = require("express-fileupload");

// Initialize express app
const app = express();

// Initialize fileUpload
app.use(fileUpload());

// Upload Endpoint
app.post("/upload", (req, res) => {
  // Check if there are files in the req

  // If no files in request
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  //   If there is a file in the request, pull the file from it and set to variable 'file'

  const file = req.files.file;
  // Use the method (mv) to move the file. Define destination
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    // Return error if they exist
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    // If no issues, return data: filename and filepath

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(5000, () => {
  console.log(`Server Started on port 5000`);
});
