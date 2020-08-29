import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Welcome from "./Welcome/Welcome";
import QuizPage from "./QuizPage/QuizPage";

export default function App() {
  return (
    <Router>
      <Route exact path="/" component={Welcome} />
      <Route path="/quiz" exact component={QuizPage} />
    </Router>
  );
}
