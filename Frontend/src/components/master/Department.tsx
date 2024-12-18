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
} from "antd";

import Pagination from "../shared/Pagination";
import Search from "../shared/Search";
import Status from "../shared/Status";

const { Title } = Typography;

interface DepartmentData {
  key: string;
  Department: string;
}

const Department: React.FC = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("Active");
  const [departments, setDepartments] = useState<DepartmentData[]>([]);

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

  const addOrUpdateDepartment = (values: DepartmentData) => {
    if (editingKey) {
      setDepartments((prev) =>
        prev.map((item) =>
          item.key === editingKey ? { ...item, ...values } : item
        )
      );
      message.success("Department updated successfully!");
    } else {
      const newDepartment: DepartmentData = {
        ...values,
        key: Date.now().toString(),
      };
      setDepartments((prev) => [...prev, newDepartment]);
      message.success("Department added successfully!");
    }
    form.resetFields();
    setIsModalOpen(false);
  };

  const deleteDepartment = (key: string) => {
    setDepartments((prev) => prev.filter((item) => item.key !== key));
    message.success("Department deleted successfully!");
  };

  const startEditing = (record: DepartmentData) => {
    setEditingKey(record.key);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredDepartment = departments.filter((item) =>
    item.Department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const columns = [
      {
        title: "Department",
        dataIndex: "Department",
        key: "Department",
      },
      {
        title: "Actions",
        key: "actions",
        render: (_: any, record: DepartmentData) => (
          <Space>
            <Button type="link" onClick={() => startEditing(record)}>
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete this department?"
              onConfirm={() => deleteDepartment(record.key)}
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
      <Title level={3}>Department Details</Title>
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: "20px" }}
      >
        Add Department
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
          <Search placeholder="Search Department" onSearch={handleSearch} />
        </div>
        <div style={{ clear: "both" }}></div>
      </div>

      <Table
        dataSource={filteredDepartment.slice(
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
        total={filteredDepartment.length}
        pageSize={pageSize}
        onChange={handlePageChange}
      />

      <Modal
        title={editingKey ? "Edit Department" : "Add Department"}
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
        <Form form={form} layout="vertical" onFinish={addOrUpdateDepartment}>
          <Form.Item
            label="Department Name"
            name="Department"
            rules={[{ required: true, message: "Department name is required!" }]}
          >
            <Input placeholder="Enter department name"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Department;
