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
  Checkbox  
} from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import Status from "../shared/Status";
import Search from "../shared/Search";
import Pagination from "../shared/Pagination";

const { Title } = Typography;

interface TypeData {
  key: string;  
  type: string;
  requiredUser: string;
  requiredAsset: string;
}

const Type: React.FC = () => {
  const [form] =Form.useForm();  
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [type, setType] = useState<TypeData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [status, setStatus] = useState<string>("Active");

  const addOrUpdateType = (values: TypeData) => {
    if (!values.requiredUser && !values.requiredAsset) {
      message.error("At least one checkbox must be selected!");
      return;
    }

    if (editingKey) {
      // Update existing record.
      setType((prev) => 
        prev.map((item) =>
          item.key === editingKey ? {...item, ...values } : item        
        )
      );
      message.success("Type updated successfully!");
    } else {
      // Add new record
      const newType: TypeData = { ...values, key: Date.now().toString() };
      setType((prev) => [...prev, newType]);
      message.success("Type added successfully!");      
    }
    form.resetFields();
    setIsModalOpen(false); // Close the modal after saving
  };

  const deleteType = (key: string) => {
    setType((prev) => prev.filter((item) => item.key !== key));
    message.success("Type deleted successfully!");
  };

  const handleOpenModal = () => {
    form.resetFields();
    setEditingKey(null);
    setIsModalOpen(true);
  };

  const handleSearch = () => {};

  const handleCloseModal = () => {
    form.resetFields();
    setIsModalOpen(false);
    setEditingKey(null);
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);    
  };

  const startEditing = (record: TypeData) => {
    setEditingKey(record.key);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Type", 
      dataIndex: "type", 
      key: "type",
      sorter: (a: TypeData, b: TypeData) => a.type.localeCompare(b.type), // Local sorting logic
    },
    {
      title: "Required User", 
      dataIndex: "requiredUser", 
      key: "requiredUser",
      sorter: (a: TypeData, b: TypeData) => Number(a.requiredUser) - Number(b.requiredUser),
      render: (value: boolean) => (value ? "Yes" : "No")
    },
    {
      title: "Required Asset", 
      dataIndex: "requiredAsset", 
      key: "requiredAsset",
      sorter: (a: TypeData, b: TypeData) => Number(a.requiredUser) - Number(b.requiredUser),
      render: (value: boolean) => (value ? "Yes" : "No")
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: TypeData) => (
        <Space>
          <Button type="link" onClick={() => startEditing(record)}>Edit</Button>
          <Popconfirm 
            title="Are you sure to delete this type?"
            onConfirm={() => deleteType(record.key)}
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
    <>
      <div style={{ padding: "20px" }}>
        <Title level={3}>Type Master</Title>
        <Button
          type="primary"
          onClick={handleOpenModal}
          style={{ marginBottom: "20px"}}
          icon={
            <PlusSquareOutlined style={{ fontWeight: 900, fontSize: "13px" }} />
          }
        >Add Type</Button>

        {/* Status and Search */}
        <div>
          <div style={{ float: "left"}}>
            <Status 
              type="Default" value={status} 
              onChange={(value) => setStatus(value)}
            />
          </div>
          <div style={{ float: "right"}}>
            <Search placeholder="Search Type" onSearch={handleSearch} />
          </div>
          <div style={{ clear: "both" }}></div>
        </div>

        {/* Table */}
        <Table
          dataSource={type}
          columns={columns}
          rowKey="key"     
          pagination={false}     
          style={{
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        />

        {/* Pagination */}
        <Pagination
          current={currentPage}
          total={type.length} // Total number of items (example: 85)
          pageSize={pageSize}
          onChange={handlePageChange}
        />


        {/* Modal */}
        <Modal 
          title = {editingKey ? "Edit Type" : "Add Type"}
          open={isModalOpen}
          onCancel={handleCloseModal}
          footer={[
            <Button key="cancel" onClick={handleCloseModal}>Cancel</Button>,
            <Button key="submit" type="primary"
              onClick={() => form.submit()}
            >
              {editingKey ? "Update" : "Save"}
            </Button>
          ]}
        >
          <Form form={form} layout="vertical" onFinish={addOrUpdateType}> 
            <Form.Item 
              label="Type" name="type" 
              rules={[{required: true, message: "Type is required!"}]}
            >
              <Input placeholder="Enter Type" />
            </Form.Item>
            <Form.Item 
              name="requiredUser" valuePropName="checked" style={{marginBottom: "0"}}>
                <Checkbox>Required User</Checkbox>
            </Form.Item>
            <Form.Item 
              name="requiredAsset" valuePropName="checked">                
                <Checkbox>Required Asset</Checkbox>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Type;
