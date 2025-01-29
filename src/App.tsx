import React from "react";
import "./App.css";
import { Details } from "@components/Details";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

const List = React.lazy(() => import("./components/List/List"));

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/:ticker" element={<Details />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
