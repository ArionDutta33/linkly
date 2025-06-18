import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashborad from "./pages/Dashboard/Dashboard";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import CreatePage from "./pages/Dashboard/CreatePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashborad />}>
        <Route path="home" element={<DashboardHome />} />
        <Route path="create" element={<CreatePage />} />
      </Route>
    </Routes>
  );
};

export default App;
