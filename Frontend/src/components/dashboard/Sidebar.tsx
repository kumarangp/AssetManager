import React from "react";
import { Menu } from "antd";
import { SettingFilled, EnvironmentFilled, DashboardFilled, DeploymentUnitOutlined, TagsFilled } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  // Dynamic Active Key Management
  const navigate = useNavigate();
  const location = useLocation();

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
        {
          key: "/settings/type",
          icon: <DeploymentUnitOutlined />,
          label: "Type",
          style: { color: "#038fdd" }
        },
        {
          key: "/settings/category",
          icon: <TagsFilled />,
          label: "Category",
          style: { color: "#038fdd" }
        },
        {
          key: "/settings/manufacturer",
          icon: <TagsFilled />,
          label: "Manufacturer",
          style: { color: "#038fdd" }
        },
        {
          key: "/settings/model",
          icon: <TagsFilled />,
          label: "Model",
          style: { color: "#038fdd" }
        }
      ],
    },
  ];

  // Determine which submenu should be open based on the current location
  const defaultOpenKeys = location.pathname.startsWith("/settings")
    ? ["settings"] : [] ;

  return (    
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      defaultOpenKeys={defaultOpenKeys}
      style={{ height: "100%", background: "#003366", color: "#038fdd" }}
      onClick={(e) => navigate(e.key)}
      items={menuItems} // Pass the items prop here
    />
  );
};

export default Sidebar;
