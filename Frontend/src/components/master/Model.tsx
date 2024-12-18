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
} from "antd";

import Pagination from "../shared/Pagination";
import Search from "../shared/Search";
import Status from "../shared/Status";

const { Title } = Typography;
const { Option } = Select;

interface ModelData {
  key: string;
  modelName: string;
  manufacturerName: string;
}

const Model: React.FC = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("Active");
  const [models, setModels] = useState<ModelData[]>([]);
  const manufacturerOptions = ["Dell", "HP", "Apple"];

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

  const addOrUpdateModel = (values: ModelData) => {
    if (editingKey) {
      setModels((prev) =>
        prev.map((item) =>
          item.key === editingKey ? { ...item, ...values } : item
        )
      );
      message.success("Model updated successfully!");
    } else {
      const newModel: ModelData = {
        ...values,
        key: Date.now().toString(),
      };
      setModels((prev) => [...prev, newModel]);
      message.success("Model added successfully!");
    }
    form.resetFields();
    setIsModalOpen(false);
  };

  const deleteModel = (key: string) => {
    setModels((prev) => prev.filter((item) => item.key !== key));
    message.success("Model deleted successfully!");
  };

  const startEditing = (record: ModelData) => {
    setEditingKey(record.key);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredModels = models.filter(
    (item) =>
      item.modelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const columns = [
    {
      title: "Manufacturer",
      dataIndex: "manufacturerName",
      key: "manufacturerName",
    },
    { title: "Model Name", dataIndex: "modelName", key: "modelName" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: ModelData) => (
        <Space>
          <Button type="link" onClick={() => startEditing(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this model?"
            onConfirm={() => deleteModel(record.key)}
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
      <Title level={3}>Model Master</Title>
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: "20px" }}
      >
        Add Model
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
          <Search placeholder="Search Model" onSearch={handleSearch} />
        </div>
        <div style={{ clear: "both" }}></div>
      </div>

      <Table
        dataSource={filteredModels.slice(
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
        total={filteredModels.length}
        pageSize={pageSize}
        onChange={handlePageChange}
      />

      <Modal
        title={editingKey ? "Edit Model" : "Add Model"}
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
        <Form form={form} layout="vertical" onFinish={addOrUpdateModel}>
          <Form.Item
            label="Manufacturer Name"
            name="manufacturerName"
            rules={[{ required: true, message: "Manufacturer is required!" }]}
          >
            <Select placeholder="Select a manufacturer">
              {manufacturerOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Model Name"
            name="modelName"
            rules={[{ required: true, message: "Model name is required!" }]}
          >
            <Input placeholder="Enter model name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Model;
