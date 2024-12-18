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
  Select
} from "antd";

import Pagination from "../shared/Pagination";
import Search from "../shared/Search";
import Status from "../shared/Status";

const { Title } = Typography;
const { Option } = Select;


interface TeamData {
  key: string;
  TeamName: string;
  DepartmentName: string;
  HandleBy: string;
}

const Team: React.FC = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("Active");
  const [teams, setTeams] = useState<TeamData[]>([]);

  const DepartmentOptions = ["Software", "Apps", "Design"];

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

  const addOrUpdateTeam = (values: TeamData) => {
    if (editingKey) {
      setTeams((prev) =>
        prev.map((item) =>
          item.key === editingKey ? { ...item, ...values } : item
        )
      );
      message.success("Team updated successfully!");
    } else {
      const newTeam: TeamData = {
        ...values,
        key: Date.now().toString(),
      };
      setTeams((prev) => [...prev, newTeam]);
      message.success("Team added successfully!");
    }
    form.resetFields();
    setIsModalOpen(false);
  };

  const deleteTeam = (key: string) => {
    setTeams((prev) => prev.filter((item) => item.key !== key));
    message.success("Team deleted successfully!");
  };

  const startEditing = (record: TeamData) => {
    setEditingKey(record.key);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredTeam = teams.filter((item) =>
    item.TeamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.DepartmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.HandleBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const columns = [
    {
      title: "Team Name",
      dataIndex: "TeamName",
      key: "TeamName",
    },
    {
      title: "Department",
      dataIndex: "DepartmentName",
      key: "DepartmentName",
    },
    {
      title: "Handle By",
      dataIndex: "HandleBy",
      key: "HandleBy",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: TeamData) => (
        <Space>
          <Button type="link" onClick={() => startEditing(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this team?"
            onConfirm={() => deleteTeam(record.key)}
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
      <Title level={3}>Team Details</Title>
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: "20px" }}
      >
        Add Team
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
          <Search placeholder="Search Team" onSearch={handleSearch} />
        </div>
        <div style={{ clear: "both" }}></div>
      </div>

      <Table
        dataSource={filteredTeam.slice(
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
        total={filteredTeam.length}
        pageSize={pageSize}
        onChange={handlePageChange}
      />

      <Modal
        title={editingKey ? "Edit Team" : "Add Team"}
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
        <Form form={form} layout="vertical" onFinish={addOrUpdateTeam}>
        <Form.Item
            label="Department"
            name="DepartmentName"
            rules={[{ required: true, message: "Please select department!" }]}
          >
            <Select placeholder="Select Department">
              {DepartmentOptions.map((option) => (
                <Option key={option} value={option}>{option}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Team Name"
            name="TeamName"
            rules={[{ required: true, message: "Team name is required!" }]}
          >
            <Input placeholder="Enter team name"></Input>
          </Form.Item>
          <Form.Item
            label="Handle by"
            name="HandleBy">
            <Input placeholder="Enter handle by"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Team;
