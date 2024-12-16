import React, {useState} from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../dashboard/HeaderComponent"
import Sidebar from "../dashboard/Sidebar";
import { Layout } from "antd";

const { Sider, Content } = Layout;

const AuthenticatedLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
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
        <HeaderComponent collapsed={collapsed} toggleSidebar = {() => setCollapsed(!collapsed)}  />
          {/* Content */}
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AuthenticatedLayout;
