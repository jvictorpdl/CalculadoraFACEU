import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ferramenta2 from "./pages/Ferramenta2/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/autodepura" element={<Home />} />
        <Route path="/ferramenta2" element={<Ferramenta2 />} />
      </Routes>
    </Router>
  );
}

export default App;