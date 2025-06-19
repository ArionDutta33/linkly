import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import CreatePage from "./pages/Dashboard/CreatePage";
import PrivateRoute from "./pages/Dashboard/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route path="home" element={<DashboardHome />} />
        <Route path="create" element={<CreatePage />} />
      </Route>
    </Routes>
  );
};

export default App;
