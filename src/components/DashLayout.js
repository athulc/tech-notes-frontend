import { Outlet } from "react-router-dom";
import DashFooter from "./DashFooter";
import DashHeader from "./DashHeader";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className="dash__container">
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
};

export default DashLayout;
