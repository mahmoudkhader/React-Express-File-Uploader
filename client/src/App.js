import React from "react";
// Import the form
import FileUpload from "./components/FileUpload";

// Using hooks here instead of classes for react 16.8. Basically get rid of class, const the name of the component, remove the curly braces and return statement (becasue will return it directly instead of as an object)
const App = () => (
  <div className="container mt-4">
    <h4 className="display-4 text-center mb-4">
      <i className="fab fa-react" /> File Upload Test
    </h4>
    <FileUpload />
  </div>
);

export default App;
