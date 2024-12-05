import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";

const { Title, Link } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}


const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      console.log("Form values: ", values);
      // call the API for login
      // Ex: await loginUser(values)
    } catch (error) {
      console.error("Login failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <Title level={3}>
        Login to Asset Manager
      </Title>

      <Form
        name="login-form"
        layout="vertical"
        onFinish={handleSubmit}
        style={formStyle}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" }
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter your password">
          </Input.Password>
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login</Button>
        </Form.Item>
      </Form>
      <Link style={forgotPasswordStyle} onClick={() => console.log("Navigate to Forgot Password")}>
        Forgot Password?
      </Link>
    </div>
  );
};



const containerStyle: React.CSSProperties = {
  maxWidth: "400px",
  margin: "150px auto 0",
  padding: "20px",
  textAlign: "center",
  border: "1px solid #f0f0f0",
  borderRadius: "8px",
  backgroundColor: "#d5d5d5",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const formStyle: React.CSSProperties = { marginTop: "20px" };

const forgotPasswordStyle: React.CSSProperties = {
  marginTop: "10px",
  display: "block",
  cursor: "pointer",
};

export default Login;

