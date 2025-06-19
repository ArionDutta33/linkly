import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import CreatePage from "./pages/Dashboard/CreatePage";
import PrivateRoute from "./pages/Dashboard/PrivateRoute";
import NotFound from "./pages/NotFound";
import usePageTitle from "./hooks/usePageTitle";

const App = () => {
  usePageTitle();
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
