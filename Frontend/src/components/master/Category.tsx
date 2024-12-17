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

interface CategoryData {
  key: string;
  type: string;
  category: string;
  categoryAssetPrefix: string;
}

const Category: React.FC = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("Active");

  const typeOptions = ["A", "B", "C"];

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

  const addOrUpdateCategory = (values: CategoryData) => {
    if (editingKey) {
      setCategories((prev) =>
        prev.map((item) =>
          item.key === editingKey ? { ...item, ...values } : item
        )
      );
      message.success("Category updated successfully!");
    } else {
      const newCategory: CategoryData = {
        ...values,
        key: Date.now().toString(),
      };
      setCategories((prev) => [...prev, newCategory]);
      message.success("Category added successfully");
    }
    form.resetFields();
    setIsModalOpen(false);
  };

  const deleteCategory = (key: string) => {
    setCategories((prev) => prev.filter((item) => item.key !== key));
    message.success("Category deleted successfully!");
  };

  const startEditing = (record: CategoryData) => {
    setEditingKey(record.key);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredCategories = categories.filter(
    (item) =>
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const columns = [    
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Category Prefix",
      dataIndex: "categoryAssetPrefix",
      key: "categoryAssetPrefix",
    },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: CategoryData) => (
        <Space>
          <Button type="link" onClick={() => startEditing(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => deleteCategory(record.key)}
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
      <Title level={3}>Category Master</Title>
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: "20px" }}
      >
        Add Category
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
          <Search placeholder="Search Category" onSearch={handleSearch} />
        </div>
        <div style={{ clear: "both" }}></div>
      </div>

      <Table
        dataSource={filteredCategories.slice(
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
        total={filteredCategories.length}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
      <Modal
        title={editingKey ? "Edit Category" : "Add Category"}
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
        <Form form={form} layout="vertical" onFinish={addOrUpdateCategory}>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Type is required!" }]}
          >
            <Select placeholder="Select a type">
              {typeOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Category is required!" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
          <Form.Item
            label="Category Prefix"
            name="categoryAssetPrefix"
            rules={[
              { required: true, message: "Category Prefix is required!" },
              { max: 3, message: "Maximum 3 letters allowed!" },
            ]}
          >
            <Input
              placeholder="Enter category prefix"
              maxLength={3}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.toUpperCase();
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;
