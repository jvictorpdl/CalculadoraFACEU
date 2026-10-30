import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ApplicationStateProvider } from "./core/providers";
import Home from './pages/Home/index';

function App() {
  return (
    <ApplicationStateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* endereços antigos abrem a calculadora atual já na aba certa */}
          <Route path="/autodepura" element={<Home />} />
          <Route path="/colicalc" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router >
    </ApplicationStateProvider>
  );
}

export default App;
