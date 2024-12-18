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

interface AssetStatusData {
  key: string;
  assetStatus: string;
}

const AssetStatus: React.FC = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("Active");
  const [assetStatus, setAssetStatus] = useState<AssetStatusData[]>([]);

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

  const addOrUpdateAssetStatus = (values: AssetStatusData) => {
    if (editingKey) {
      setAssetStatus((prev) =>
        prev.map((item) =>
          item.key === editingKey ? { ...item, ...values } : item
        )
      );
      message.success("Asset status updated successfully!");
    } else {
      const newAssetStatus: AssetStatusData = {
        ...values,
        key: Date.now().toString(),
      };
      setAssetStatus((prev) => [...prev, newAssetStatus]);
      message.success("Asset status added successfully!");
    }
    form.resetFields();
    setIsModalOpen(false);
  };

  const deleteAssetStatus = (key: string) => {
    setAssetStatus((prev) => prev.filter((item) => item.key !== key));
    message.success("Asset status deleted successfully!");
  };

  const startEditing = (record: AssetStatusData) => {
    setEditingKey(record.key);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredAssetStatus = assetStatus.filter((item) =>
    item.assetStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const columns = [
    {
      title: "Asset status",
      dataIndex: "assetStatus",
      key: "assetStatus",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: AssetStatusData) => (
        <Space>
          <Button type="link" onClick={() => startEditing(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this asset status?"
            onConfirm={() => deleteAssetStatus(record.key)}
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
      <Title level={3}>Asset status</Title>
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: "20px" }}
      >
        Add Asset Status
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
          <Search placeholder="Search Asset Status" onSearch={handleSearch} />
        </div>
        <div style={{ clear: "both" }}></div>
      </div>

      <Table
        dataSource={filteredAssetStatus.slice(
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
        total={filteredAssetStatus.length}
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
        <Form form={form} layout="vertical" onFinish={addOrUpdateAssetStatus}>
          <Form.Item
            label="Asset Status"
            name="assetStatus"
            rules={[{ required: true, message: "Asset Status is required!" }]}
          >
            <Input placeholder="Enter asset status"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AssetStatus;
