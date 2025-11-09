import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import AhteltesPage from "../pages/Athletes/AthletesPage.jsx";
import TeamsPage from "../pages/Teams/TeamsPage.jsx";
import StaffPage from "../pages/Staff/StaffPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="athletes" element={<AhteltesPage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route path="staff" element={<StaffPage />} />
      </Route>
    </Routes>
  );
}
