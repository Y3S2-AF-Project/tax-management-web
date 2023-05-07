import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, AdminDashboard, TaxOfficialDashboard } from "../pages";
import { Provider } from "react-redux";
import store from "../store";
import { AdminLogin, Logout, TaxOfficialLogin } from "../features";

const MainRoutes = () => {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin/dashboard/:tabValue"
            element={<AdminDashboard />}
          />

          <Route path="/tax-official/login" element={<TaxOfficialLogin />} />
          <Route
            path="/tax-official/dashboard"
            element={<TaxOfficialDashboard />}
          />
          <Route
            path="/tax-official/dashboard/:tabValue"
            element={<TaxOfficialDashboard />}
          />
        </Routes>
      </Provider>
    </Router>
  );
};

export default MainRoutes;
