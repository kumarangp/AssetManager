import React from "react";
import { Menu } from "antd";
import { SettingFilled, 
  EnvironmentFilled, 
  DashboardFilled, 
  TagsFilled, ShoppingOutlined, AppstoreOutlined, ProductOutlined,
  FundProjectionScreenOutlined, NumberOutlined, CheckCircleOutlined,
  TeamOutlined, ClusterOutlined, UserAddOutlined, FileTextOutlined, LaptopOutlined
} from "@ant-design/icons";
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
      style: { color: "#038fdd" }      
    },
    {
      key: "transaction",
      icon: <SettingFilled />,
      label: "Transaction",
      style: { color: "#038fdd" },
      children: [
        {
          key: "/invoice",
          icon: <FileTextOutlined />,
          label: "Invoice",
          style: { color: "#038fdd" }
        },
        {
          key: "/asset",
          icon: <LaptopOutlined />,
          label: "All Assets",
          style: { color: "#038fdd" }
        }
      ]
    },
    {
      key: "users",
      icon: <SettingFilled />,
      label: "Users",
      style: { color: "#038fdd" },
      children: [
        {
          key: "/department",
          icon: <ClusterOutlined />,
          label: "Department",
          style: { color: "#038fdd" }
        },
        {
          key: "/team",
          icon: <TeamOutlined />,
          label: "Teams",
          style: { color: "#038fdd" }
        },
        {
          key: "/employee",
          icon: <UserAddOutlined />,
          label: "Employees",
          style: { color: "#038fdd" }
        }
      ]
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
          icon: <ProductOutlined />,
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
          key: "/settings/supplier",
          icon: <ShoppingOutlined />,
          label: "Supplier",
          style: { color: "#038fdd" }
        },
        {
          key: "/settings/manufacturer",
          icon: <AppstoreOutlined />,
          label: "Manufacturer",
          style: { color: "#038fdd" }
        },
        {
          key: "/settings/model",
          icon: <FundProjectionScreenOutlined />,
          label: "Model",
          style: { color: "#038fdd" }
        },
        {
          key: "/settings/modelnumber",
          icon: <NumberOutlined />,
          label: "Model Number",
          style: { color: "#038fdd" }
        },
        {
          key: "/settings/assetstatus",
          icon: <CheckCircleOutlined />,
          label: "Asset Status",
          style: { color: "#038fdd" }
        }       
      ],
    },
  ];

  // Determine which submenu should be open based on the current location
  const defaultOpenKeys = 
    location.pathname.startsWith("/settings") 
      ? ["settings"] 
      : location.pathname.startsWith("/department") || 
        location.pathname.startsWith("/employee") || 
        location.pathname.startsWith("/team") ? ["users"] 
      : location.pathname.startsWith("/invoice") || 
      location.pathname.startsWith("/asset") ? ["transaction"]
      : [];

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
