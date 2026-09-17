import React from "react";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="loading">
      <div className="loading__spinner"></div>

      <p>{message}</p>
    </div>
  );
};

export default Loading;