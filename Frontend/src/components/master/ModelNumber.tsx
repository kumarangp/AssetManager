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

interface ModelNumberData {
  key: string;
  modelName: string;
  modelNumber: string;
}

const ModelNumber: React.FC = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("Active");
  const [modelNumbers, setModelNumbers] = useState<ModelNumberData[]>([]);
  const modelNameOptions = ["Vostra", "Insipiron", "Galaxy"];

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

  const addOrUpdateModelNumber = (values: ModelNumberData) => {    
    if (editingKey) {
      setModelNumbers((prev) => 
      (prev).map((item) => item.key === editingKey ? {...item, ...values} : item));
      message.success("Model number updated successfully!");      
    } else {
        const newModelNumber: ModelNumberData = {
          ...values,
          key: Date.now().toString()
        };
        setModelNumbers((prev) => [...prev, newModelNumber]);
        message.success("Model number added successfully!");        
    }
    form.resetFields();
    setIsModalOpen(false);
  };

  const deleteModelNumber = (key: string) => {
    setModelNumbers((prev) => prev.filter((item) => item.key !== key));
    message.success("Model Number deleted successfully!");
  };

  const startEditing = (record: ModelNumberData) => {
    setEditingKey(record.key);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredModelNumbers = modelNumbers.filter(
    (item) =>
      item.modelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.modelNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredModelNumbers);

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const columns = [
    {
      title: "Model Number",
      dataIndex: "modelNumber",
      key: "modelNumber"
    },
    {
      title: "Model Name",
      dataIndex: "modelName",
      key: "modelName"
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: ModelNumberData) => (
        <Space>
          <Button type="link"
            onClick={() => startEditing(record)}
            >
              Edit
          </Button>
          <Popconfirm 
            title="Are you sure to delete this model number?"
            onConfirm={() => deleteModelNumber(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Model Number & Model Name Master</Title>
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: "20px" }}
      >
        Add Model Number
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
          <Search placeholder="Search Model Number" onSearch={handleSearch} />
        </div>
        <div style={{ clear: "both" }}></div>
      </div>

      <Table
        dataSource={filteredModelNumbers.slice(
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
        total={filteredModelNumbers.length}
        pageSize={pageSize}
        onChange={handlePageChange}
      />

      <Modal
        title={editingKey ? "Edit Model Number" : "Add Model Number"}
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
        <Form form={form} layout="vertical" onFinish={addOrUpdateModelNumber}>
          <Form.Item
            label="Model Name"
            name="modelName"
            rules={[{ required: true, message: "Model name is required!" }]}
          >
            <Select placeholder="Select Model">
              {modelNameOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Model Number"
            name="modelNumber"
            rules={[{ required: true, message: "Model number is required!" }]}
          >
            <Input placeholder="Enter model number"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModelNumber;