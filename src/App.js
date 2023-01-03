import React from "react";
import Gradient from "./container/gradient/gradient";
import "./App.css";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Gradient />} />
    </Routes>
  );
}

export default App;
