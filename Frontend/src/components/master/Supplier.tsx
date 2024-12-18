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

interface SupplierData {
  key: string;
  SupplierName: string;
  Address: string;
  City: string;
  State: string;
  Pincode: string;
  ContactPerson: string;
  Email: string;
  Phone: string;
  GSTNumber: string;
}

const Supplier: React.FC = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("Active");
  const [supplierDetails, setSupplierDetails] = useState<SupplierData[]>([]);

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

  const addOrUpdateSupplierDetails = (values: SupplierData) => {
    if (editingKey) {
      setSupplierDetails((prev) =>
        prev.map((item) =>
          item.key === editingKey ? { ...item, ...values } : item
        )
      );
      message.success("Supplier Details updated successfully!");
    } else {
      const newSupplier: SupplierData = {
        ...values,
        key: Date.now().toString(),
      };
      setSupplierDetails((prev) => [...prev, newSupplier]);
      message.success("Supplier Details added successfully!");
    }
    form.resetFields();
    setIsModalOpen(false);
  };

  const deleteSupplierDetails = (key: string) => {
    setSupplierDetails((prev) => prev.filter((item) => item.key !== key));
    message.success("Supplier Details deleted successfully!");
  };

  const startEditing = (record: SupplierData) => {
    setEditingKey(record.key);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredSupplier = supplierDetails.filter(
    (item) =>
      item.SupplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.City.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.State.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Pincode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ContactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.GSTNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const columns = [
    {
      title: "Supplier Name",
      dataIndex: "SupplierName",
      key: "SupplierName",
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
    },
    {
      title: "City",
      dataIndex: "City",
      key: "City",
    },
    {
      title: "State",
      dataIndex: "State",
      key: "State",
    },
    {
      title: "Pincode",
      dataIndex: "Pincode",
      key: "Pincode",
    },
    {
      title: "ContactPerson",
      dataIndex: "ContactPerson",
      key: "ContactPerson",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
    },
    {
      title: "GSTNumber",
      dataIndex: "GSTNumber",
      key: "GSTNumber",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: SupplierData) => (
        <Space>
          <Button type="link" onClick={() => startEditing(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this supplier?"
            onConfirm={() => deleteSupplierDetails(record.key)}
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
      <Title level={3}>Supplier Details</Title>
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: "20px" }}
      >
        Add Supplier
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
          <Search placeholder="Search Supplier" onSearch={handleSearch} />
        </div>
        <div style={{ clear: "both" }}></div>
      </div>

      <Table
        dataSource={filteredSupplier.slice(
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
        total={filteredSupplier.length}
        pageSize={pageSize}
        onChange={handlePageChange}
      />

      <Modal
        title={editingKey ? "Edit Supplier Details" : "Add Supplier Details"}
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
        <Form
          form={form}
          layout="vertical"
          onFinish={addOrUpdateSupplierDetails}
        >
          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ flex: 1 }}>
              <Form.Item
                label="Supplier Name"
                name="SupplierName"
                rules={[
                  { required: true, message: "Supplier name is required!" },
                ]}
              >
                <Input placeholder="Enter supplier name"></Input>
              </Form.Item>
              <Form.Item label="City" name="City">
                <Input placeholder="Enter City"></Input>
              </Form.Item>
              <Form.Item label="Pincode" name="Pincode">
                <Input placeholder="Enter Pincode"></Input>
              </Form.Item>
              <Form.Item
                label="Email"
                rules={[{ type: "email", message: "Please enter valid email" }]}
                name="Email"
              >
                <Input placeholder="Enter Email"></Input>
              </Form.Item>
              <Form.Item label="GSTNumber" name="GSTNumber">
                <Input placeholder="Enter GSTNumber"></Input>
              </Form.Item>
            </div>
            <div style={{ flex: 1 }}>
              <Form.Item label="Address" name="Address">
                <Input placeholder="Enter Address"></Input>
              </Form.Item>
              <Form.Item label="State" name="State">
                <Input placeholder="Enter State"></Input>
              </Form.Item>
              <Form.Item label="ContactPerson" name="ContactPerson">
                <Input placeholder="Enter ContactPerson"></Input>
              </Form.Item>
              <Form.Item label="Phone" name="Phone">
                <Input placeholder="Enter Phone"></Input>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Supplier;
