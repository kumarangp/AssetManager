import React from "react";
import { Layout, Typography } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const Dashboard: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider>
        <Sidebar />
      </Sider>

      {/* Main Layout */}
      <Layout>
        <Header style={{ padding: "0 16px", background: "#fff" }}>
          <Title level={4} style={{ margin: 0 }}>
            IT Asset Management
          </Title>
        </Header>
        <Content style={{ margin: "16px", padding: "16px", background: "#fff" }}>
          {/* Main Content */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
