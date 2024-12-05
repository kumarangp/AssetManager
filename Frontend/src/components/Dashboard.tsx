import React, { useState } from "react";
import { Layout, Menu, Avatar, Typography, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  SettingOutlined,
  FileTextOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  }

  const menuItems = [
    {key: "1", icon: <HomeOutlined />, label: "Home"},
    {key: "2", icon: <FileTextOutlined />, label: "Assets"},
    {key: "3", icon: <SettingOutlined />, label: "Settings"},
    {key: "4", icon: <LogoutOutlined />, label: "Logout"},
  ];

  return(
    <Layout style = {{minHeight: "100vh"}}>
      {/** Sidebar */}
      <Sider collapsible collapsed={collapsed} trigger={null}>
        <div style={styles.logo}>
          <Title level={4} style={styles.logoText}>
            {collapsed ? "AM" : "Asset Manager"}
          </Title>
        </div>
        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>
      {/** Main Layout */}
      <Layout>
        {/* Top Bar */}
        <Header style={styles.header}>
          <Button 
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined/>}
            onClick={toggleMenu}
            style={styles.menuToggle}
          />
          <div style={styles.userInfo}>
            <Avatar style={styles.avatar}>U</Avatar>
            <span style={styles.username}>John Doe</span>
          </div>
        </Header>
        {/* Content area */}
        <Content style={styles.content}>
          <Title level={3}>Welcome to the Dashboard</Title>
          <p>This is where your dashboard content will go</p>
        </Content>
      </Layout>
    </Layout>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  logo: {
    height: "64px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
  },
  logoText: {
    margin: 0,
    color: "#fff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 16px",
    backgroundColor: "#001529",
    color: "#fff",
  },
  menuToggle: {
    fontSize: "18px",
    color: "#fff",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#87d068",
    marginRight: "10px",
  },
  username: {
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    margin: "16px",
    padding: "24px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};


export default Dashboard;