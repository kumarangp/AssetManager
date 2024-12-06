import React from "react";
import { Menu } from "antd";
import { SettingOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick = (menuKey: string) => {
    navigate(menuKey);
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["/dashboard"]}
      style={{ height: "100%", background: "#DEF3FF" }}
      onClick={(e) => handleMenuClick(e.key)}
    >
      <Menu.Item key="/dashboard" icon={<SettingOutlined />}>
        Dashboard
      </Menu.Item>

      <Menu.SubMenu key="settings" icon={<SettingOutlined />} title="Settings">
        <Menu.Item key="/settings/location" icon={<EnvironmentOutlined />}>
          Location
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default Sidebar;
