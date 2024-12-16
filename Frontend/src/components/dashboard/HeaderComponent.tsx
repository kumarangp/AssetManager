import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Typography, Button, Avatar, Dropdown, Layout } from "antd";
import { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Header } = Layout;

interface HeaderComponentProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({collapsed, toggleSidebar}) => {
  const items: MenuProps["items"] = [
    { label: "Profile", key: "profile" },
    { label: "Logout", key: "logout" }
  ];

  const navigate = useNavigate();
  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      // Redirect to login page on logout
      navigate("/login");
    }
  };

  return (
    <Header
      style={{
        padding: "0 16px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 0 4px 4px rgba(0,0,0,0.08)",
      }}
    >
      {/* Sidebar Toggle Button */}
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleSidebar}
        style={{ fontSize: "18px" }}
      />

      {/* Title */}
      <Title level={4} style={{ margin: "0 16px", flex: 1 }}>
        IT Asset Management
      </Title>

      {/* User Info and Logout */}
      <Dropdown menu={{ items, onClick: handleMenuClick }} placement="bottomRight">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Avatar icon={<UserOutlined />} style={{ marginRight: "8px" }} />
          <span>John Doe</span>
        </div>
      </Dropdown>
    </Header>
  );
};

export default HeaderComponent;
