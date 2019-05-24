// racfp creates a react boilerplate with prop-types
import React from "react";
import PropTypes from "prop-types";

// Destructure msg object as the props
const Message = ({ msg }) => {
  return (
    <div>
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        {msg}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

Message.propTypes = {
  // ptsr is the shortcut for the below proptypes
  msg: PropTypes.string.isRequired
};

export default Message;
