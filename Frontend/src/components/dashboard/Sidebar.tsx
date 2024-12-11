import React from "react";
import { Menu } from "antd";
import { SettingFilled, EnvironmentFilled, DashboardFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import './Sidebar.css';

// import { Color } from "antd/es/color-picker";


const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick = (menuKey: string) => {
    navigate(menuKey);
  };

   // Define the menu items using the "items" prop
  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardFilled />,
      label: "Dashboard",
      style: { color: "#038fdd" },
    },
    {
      key: "settings",
      icon: <SettingFilled />,
      label: "Settings",
      style: { color: "#038fdd" },
      children: [
        {
          key: "/settings/location",
          icon: <EnvironmentFilled />,
          label: "Location",
          style: { color: "#038fdd" },
        },
      ],
    },
  ];

  return (    
    <Menu
      mode="inline"
      defaultSelectedKeys={["/dashboard"]}
      style={{ height: "100%", background: "#003366", color: "#038fdd" }}
      onClick={(e) => handleMenuClick(e.key)}
      items={menuItems} // Pass the items prop here
    />
  );
};

export default Sidebar;
