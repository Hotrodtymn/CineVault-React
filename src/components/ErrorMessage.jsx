import React from "react";

const ErrorMessage = ({ message = "Something went wrong." }) => {
  return (
    <div className="error-message">
      <p className="error-message__title">
        Something went wrong
      </p>

      <p className="error-message__text">
        {message}
      </p>
    </div>
  );
};

export default ErrorMessage;