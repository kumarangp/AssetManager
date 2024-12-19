import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Table,
  Space,
  Popconfirm,
  message,
  Typography,
  Modal,
  Select,
  Row,
  Col,
} from "antd";

import Pagination from "../shared/Pagination";
import Search from "../shared/Search";
import Status from "../shared/Status";

const { Title } = Typography;
const { Option } = Select;

interface EmployeeData {
  key: string;
  EmployeeId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Username: string;
  Department: string;
  Team: string;
  Reporting: string;
  Mobile: string;
  WorkLocation: string;
  SeatNumber: string;
  UserRole: string;
  Status: string;
  CreatedBy: string;
  CreatedDate: string;
  ModifiedBy: string;
  ModifiedDate: string;
}

const Employee: React.FC = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("Active");
  const [employeeDetails, setEmployeeDetails] = useState<EmployeeData[]>([]);

  const DepartmentOptions = ["Software", "Operations", "PO", "Design"];
  const TeamOptions = ["Team 1", "Team 2", "Team 3"];
  const ReportingOptions = ["Reporting 1", "Reporting 2", "Reporting 3"];
  const WorkLocationOptions = ["AKS", "USA", "Singanallur"];
  const UserRoleOptions = ["User", "Admin", "Super User"];
  const StatusOptions = ["Active", "Inactive"];

  const handleOpenModal = () => {
    form.resetFields();
    setEditingKey(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    form.resetFields();
    setEditingKey(null);
    setIsModalOpen(false);
  };

  const addOrUpdateEmployee = (values: EmployeeData) => {
    if (editingKey) {
      setEmployeeDetails((prev) =>
        prev.map((item) =>
          item.key === editingKey ? { ...item, ...values } : item
        )
      );
      message.success("Employee Details updated successfully!");
    } else {
      const newEmployee: EmployeeData = {
        ...values,
        key: Date.now().toString(),
      };
      setEmployeeDetails((prev) => [...prev, newEmployee]);
      message.success("Employee Details added successfully!");
    }
    form.resetFields();
    setIsModalOpen(false);
  };

  const deleteEmployee = (key: string) => {
    setEmployeeDetails((prev) => prev.filter((item) => item.key !== key));
    message.success("Employee Details deleted successfully!");
  };

  const startEditing = (record: EmployeeData) => {
    setEditingKey(record.key);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredEmployees = employeeDetails.filter(
    (item) =>
      item.EmployeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.WorkLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const columns = [
    {
      title: "Employee Id",
      dataIndex: "EmployeeId",
      key: "EmployeeId",
    },
    {
      title: "First Name",
      dataIndex: "FirstName",
      key: "FirstName",
    },
    {
      title: "Last Name",
      dataIndex: "LastName",
      key: "LastName",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Department",
      dataIndex: "Department",
      key: "Department",
    },
    {
      title: "Work Location",
      dataIndex: "WorkLocation",
      key: "WorkLocation",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: EmployeeData) => (
        <Space>
          <Button type="link" onClick={() => startEditing(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this employee?"
            onConfirm={() => deleteEmployee(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Employee Details</Title>
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: "20px" }}
      >
        Add Employee
      </Button>
      <div>
        <div style={{ float: "left" }}>
          <Status
            type="Default"
            value={status}
            onChange={(value) => setStatus(value)}
          />
        </div>
        <div style={{ float: "right" }}>
          <Search placeholder="Search Employee" onSearch={handleSearch} />
        </div>
        <div style={{ clear: "both" }}></div>
      </div>

      <Table
        dataSource={filteredEmployees.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )}
        columns={columns}
        rowKey="key"
        pagination={false}
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      />

      <Pagination
        current={currentPage}
        total={filteredEmployees.length}
        pageSize={pageSize}
        onChange={handlePageChange}
      />

      <Modal
        width={1300}
        title={editingKey ? "Edit Employee Details" : "Add Employee Details"}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            {editingKey ? "Update" : "Save"}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={addOrUpdateEmployee}>
          <Row gutter={16}>
            <Col span={4}>
              <Form.Item
                label="Employee Id"
                name="EmployeeId"
                rules={[
                  { required: true, message: "Employee id is required!" },
                ]}
              >
                <Input placeholder="Enter Employee Id"></Input>
              </Form.Item>
              <Form.Item label="Team" name="Team">
                <Select placeholder="Select Team">
                  {TeamOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Status" name="Status">
                <Select placeholder="Status">
                  {StatusOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label="First Name"
                name="FirstName"
                rules={[{ required: true, message: "First Name is required!" }]}
              >
                <Input placeholder="Enter First Name"></Input>
              </Form.Item>
              <Form.Item label="Reporting" name="Reporting">
                <Select placeholder="Select Reporting">
                  {ReportingOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Created by" name="CreatedBy">
                <Input disabled></Input>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label="Last Name"
                name="LastName"
                rules={[{ required: true, message: "Last Name is required!" }]}
              >
                <Input placeholder="Enter Last Name"></Input>
              </Form.Item>
              <Form.Item label="Mobile" name="Mobile">
                <Input placeholder="Enter Mobile"></Input>
              </Form.Item>

              <Form.Item label="Created Date" name="CreatedDate">
                <Input disabled></Input>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label="Email"
                rules={[{ type: "email", message: "Please enter valid email" }]}
                name="Email"
              >
                <Input placeholder="Enter Email Address"></Input>
              </Form.Item>

              <Form.Item label="Work Location" name="WorkLocation">
                <Select placeholder="Select Work Location">
                  {WorkLocationOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Modified By" name="ModifiedBy">
                <Input disabled></Input>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label="Username"
                name="Username"
                rules={[{ required: true, message: "User Name is required!" }]}
              >
                <Input placeholder="Enter Username"></Input>
              </Form.Item>
              <Form.Item label="Seat Number" name="SeatNumber">
                <Input placeholder="Enter Seat Number"></Input>
              </Form.Item>
              <Form.Item label="Modified Date" name="ModifiedDate">
                <Input disabled></Input>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Department" name="Department">
                <Select placeholder="Department">
                  {DepartmentOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="User Role" name="UserRole">
                <Select placeholder="User Role">
                  {UserRoleOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Employee;
