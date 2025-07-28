import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ApplicationStateProvider } from "./core/providers";
import AutoDepura from "./pages/AutoDepura/index";
import ColiCalc from "./pages/ColiCalc/index";
import Home from './pages/Home/index';

//comentario
function App() {
  return (
    <ApplicationStateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/autodepura" element={<AutoDepura />} />
          <Route path="/colicalc" element={<ColiCalc />} />
        </Routes>
      </Router >
    </ApplicationStateProvider>
  );
}

export default App;