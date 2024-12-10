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

  return (    
    <Menu
      mode="inline" 
      defaultSelectedKeys={["/dashboard"]}
      style={{ height: "100%", background: "#003366", color: "#038fdd" }}  
      onClick={(e) => handleMenuClick(e.key)}
    >
      
      <Menu.Item key="/dashboard"  icon={<DashboardFilled />} style={{ color: "#038fdd" }}> 
        Dashboard
      </Menu.Item>
      
      <Menu.SubMenu key="settings" icon={<SettingFilled />} title="Settings" style={{ color: "#038fdd" }}>  
        <Menu.Item key="/settings/location" icon={<EnvironmentFilled />} style={{ color: "#038fdd" }}>  
          Location
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default Sidebar;
