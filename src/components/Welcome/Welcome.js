import React from "react";
import { Link } from "react-router-dom";

import "./Welcome.css";

export default function Welcome() {
  return (
    <div className="welcome-main-div">
      <h1 className="welcome-heading">Are you ready for the quiz?</h1>
      <Link to="/quiz" class="welcome-link">
        Start now!
      </Link>
    </div>
  );
}
