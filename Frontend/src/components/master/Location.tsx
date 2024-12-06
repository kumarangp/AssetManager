import React, { useState } from "react";
import { Button, Form, Input, Table, Space, Popconfirm, message, Typography, Modal } from "antd";

const { Title } = Typography;

interface Location {
  key: string;
  location: string;
  address?: string;
  city?: string;
  state?: string;
  pinCode?: string;
}

const Location: React.FC = () => {
  const [form] = Form.useForm();
  const [locations, setLocations] = useState<Location[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    form.resetFields(); // Clear the form when opening the modal
    setEditingKey(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    form.resetFields(); // Reset the form on modal close
    setIsModalOpen(false);
    setEditingKey(null);
  };

  const addOrUpdateLocation = (values: Location) => {
    if (editingKey) {
      // Update existing record
      setLocations((prev) =>
        prev.map((item) =>
          item.key === editingKey ? { ...item, ...values } : item
        )
      );
      message.success("Location updated successfully!");
    } else {
      // Add new record
      const newLocation: Location = { ...values, key: Date.now().toString() };
      setLocations((prev) => [...prev, newLocation]);
      message.success("Location added successfully!");
    }
    form.resetFields();
    setIsModalOpen(false); // Close the modal after saving
  };

  const deleteLocation = (key: string) => {
    setLocations((prev) => prev.filter((item) => item.key !== key));
    message.success("Location deleted successfully!");
  };

  const startEditing = (record: Location) => {
    setEditingKey(record.key);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const columns = [
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "City", dataIndex: "city", key: "city" },
    { title: "State", dataIndex: "state", key: "state" },
    { title: "Pin Code", dataIndex: "pinCode", key: "pinCode" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Location) => (
        <Space>
          <Button type="link" onClick={() => startEditing(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this location?"
            onConfirm={() => deleteLocation(record.key)}
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
      <Title level={3}>Location Master</Title>
      <Button type="primary" onClick={handleOpenModal} style={{ marginBottom: "20px" }}>
        Add Location
      </Button>

      {/* Table */}
      <Table
        dataSource={locations}
        columns={columns}
        rowKey="key"
        pagination={{ pageSize: 5 }}
      />

      {/* Modal */}
      <Modal
        title={editingKey ? "Edit Location" : "Add Location"}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
          >
            {editingKey ? "Update" : "Save"}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={addOrUpdateLocation}>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Location is required!" }]}
          >
            <Input placeholder="Enter location name" />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input placeholder="Enter address (optional)" />
          </Form.Item>
          <Form.Item label="City" name="city">
            <Input placeholder="Enter city (optional)" />
          </Form.Item>
          <Form.Item label="State" name="state">
            <Input placeholder="Enter state (optional)" />
          </Form.Item>
          <Form.Item label="Pin Code" name="pinCode">
            <Input placeholder="Enter pin code (optional)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Location;
