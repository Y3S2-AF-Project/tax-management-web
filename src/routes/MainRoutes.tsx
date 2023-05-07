import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Calculators } from "../pages";

const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculators" element={<Calculators />} />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
