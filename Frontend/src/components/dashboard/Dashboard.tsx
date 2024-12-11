import React, { useState } from "react";
import { Layout, Typography, Button, Avatar, Dropdown } from "antd";
import { Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Sidebar from "./Sidebar";
import type { MenuProps } from "antd";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuProps["items"] = [
    { label: "Profile", key: "profile" },
    { label: "Logout", key: "logout" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        style={{ backgroundColor: "#002447" }}
      >
        <div
          style={{
            height: "64px",
            textAlign: "center",
            color: "white",
            lineHeight: "64px",
            fontWeight: "bold",
          }}
        >
          {collapsed ? "IT" : "IT Asset Manager"}
        </div>
        <Sidebar />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
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
          <Dropdown menu={{ items }} placement="bottomRight">
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

        {/* Content */}
        <Content style={{ margin: "16px", padding: "16px" }}>          
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
