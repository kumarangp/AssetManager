import React from "react";
import { Outlet } from "react-router-dom";

const GeneralLayout: React.FC = () => {
  return(
    <div className="layout">
      <Outlet />
    </div>
  );
};

export default GeneralLayout;