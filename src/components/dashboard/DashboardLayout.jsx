import { Outlet } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
const DashboardLayout = () => {
  return (
    <div>
      {/* <h1>Dashboard Layout</h1> Debugging purpose */}
      <Dashboard/>
      <Outlet /> {/* ✅ Ensures child routes like Profile get rendered */}
    </div>
  );
};

export default DashboardLayout;
