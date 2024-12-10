import React, { useState } from "react";
import { Layout, Typography, Button, Avatar, Dropdown, Menu } from "antd";
import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import Sidebar from "./Sidebar";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible collapsed={collapsed} trigger={null} style={{ backgroundColor: "#002447" }}>
        <div style={{ height: "64px", textAlign: "center", color: "white", lineHeight: "64px", fontWeight: "bold" }}>
          {collapsed ? "IT" : "IT Asset Manager"}
        </div>
        <Sidebar />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
        <Header style={{ padding: "0 16px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow:"0 0 4px 4px rgba(0,0,0,0.08)" }}>
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
          <Dropdown overlay={userMenu} placement="bottomRight">
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <Avatar icon={<UserOutlined />} style={{ marginRight: "8px" }} />
              <span>John Doe</span>
            </div>
          </Dropdown>
        </Header>

        {/* Content */}
        <Content style={{ margin: "16px", padding: "16px", background: "#E8E8E8" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
