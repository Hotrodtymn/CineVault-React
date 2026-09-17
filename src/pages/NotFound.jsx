import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="not-found">
      <p className="not-found__code">404</p>

      <h1>Page Not Found</h1>

      <p className="not-found__message">
        Sorry, the page you're looking for doesn't exist.
      </p>

      <Link to="/" className="not-found__button">
        Back to Home
      </Link>
    </section>
  );
};

export default NotFound;