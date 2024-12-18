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
  Modal  
} from "antd";
import Pagination from "../shared/Pagination";
import Search from "../shared/Search";
import Status from "../shared/Status";

const { Title } = Typography;


interface ManufacturerData {
  key: string;
  manufacturerName: string;
}

const Manufacturer: React.FC = () => {
  const [form] = Form.useForm();
  const [manufacturer, setManufacturer] = useState<ManufacturerData[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("Active");

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

  const addOrUpdateManufacturer = (values: ManufacturerData) => {
    if (editingKey) {
      setManufacturer((prev) =>
        prev.map((item) =>
          item.key === editingKey ? { ...item, ...values } : item
        )
      );
      message.success("Manufacturer updated successfully!");
    } else {
      const newManufacturer: ManufacturerData = {
        ...values,
        key: Date.now().toString(),
      };
      setManufacturer((prev) => [...prev, newManufacturer]);
      message.success("Manufacturer added successfully!");
    }
    form.resetFields();
    setIsModalOpen(false);
  };

  const deleteManufacturer = (key: string) => {
    setManufacturer((prev) => prev.filter((item) => item.key !== key));
    message.success("Manufacturer deleted successfully!");
  };

  const startEditing = (record: ManufacturerData) => {
    setEditingKey(record.key);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredManufacturer = manufacturer.filter(
    (item) => item.manufacturerName.toLowerCase().includes(searchTerm.toLowerCase()));

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  }

  const columns = [
    {title: "Manufacture", dataIndex: "manufacturerName", key: "manufacturerName"},
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: ManufacturerData) => (
        <Space>
          <Button type="link" onClick={() => startEditing(record)}>Edit</Button>
          <Popconfirm 
            title="Are you sure to delete this manufacturer?"
            onConfirm={() => deleteManufacturer(record.key)}
            okText="Yes"
            cancelText="No"
            >
              <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Manufacturer Master</Title>
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: "20px" }}
      >
        Add Manufacturer
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
          <Search placeholder="Search Manufacurer" onSearch={handleSearch} />
        </div>
        <div style={{ clear: "both" }}></div>
      </div>

      <Table
        dataSource={filteredManufacturer.slice(
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
        total={filteredManufacturer.length}
        pageSize={pageSize}
        onChange={handlePageChange}
      />

      <Modal
        title = {editingKey ? "Ecit Manufacturer" : "Add Manufacturer"}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            {editingKey ? "Update" : "Save" }
          </Button>
        ]}
      >
        <Form form={form} layout="vertical" onFinish={addOrUpdateManufacturer}>
          <Form.Item
            label="Manufacturer name"
            name="manufacturerName"
            rules={[{required: true, message: "Manufacturer is required!"}]}
          >
            <Input placeholder="Enter manufacturer name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Manufacturer;
