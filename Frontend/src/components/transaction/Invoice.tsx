import React, { useState } from "react";
import moment from "moment";
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
  Row,
  Col,
  DatePicker,
  Upload,
} from "antd";
import { UploadOutlined, CloudDownloadOutlined } from "@ant-design/icons";

import Pagination from "../shared/Pagination";
import Search from "../shared/Search";
import Status from "../shared/Status";

const { Title } = Typography;
const { Option } = Select;



interface InvoiceData {
  key: string;
  PoDate: Date | null;  // Using Date instead of string
  PoNumber: string;
  PoCost: number;
  Supplier: string;
  InvoiceDate: Date | null;  // Using Date instead of string
  InvoiceNumber: string;
  Location: string;
  PoFilePath: string;
  InvoiceFilePath: string;
}

const Invoice: React.FC = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("Active");
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceData[]>([]);

  const SupplierOptions = ["Supplier 1", "Supplier 2", "Supplier 3"];
  const LocationOptions = ["AKS", "USA"];

  const [poFileList, setPoFileList] = useState<any[]>([]);
  const [invoiceFileList, setinvoiceFileList] = useState<any[]>([]);

  // Handle file change (after upload)
  const handlePoFileUpload = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }

    // Update the fileList when the file changes (e.g., uploaded, removed)
    setPoFileList(info.fileList);
  };

  const handleInvoiceFileUpload = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }

    // Update the fileList when the file changes (e.g., uploaded, removed)
    setinvoiceFileList(info.fileList);
  };

  // Handle before file upload
  const beforeUpload = (file: any) => {
    const isValid = file.type === "image/jpeg" || 
                    file.type === "image/png" ||
                    file.type === "application/pdf";
    if (!isValid) {
      message.error("You can only upload JPG/PNG/pdf files!");
    }
    return isValid;
  };

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

  const addOrUpdateInvoice = (values: any) => {
    const updatedInvoiceDetails = {
      ...values,
      PoDate: values.PoDate ? values.PoDate.toDate() : null,
      InvoiceDate: values.InvoiceDate
        ? values.InvoiceDate.toDate()
        : null,
    };

    if (editingKey) {
      setInvoiceDetails((prev) =>
        prev.map((item) =>
          item.key === editingKey ? { ...item, ...updatedInvoiceDetails } : item
        )
      );
      message.success("Invoice Details updated successfully!");
    } else {
      const newInvoice: InvoiceData = {
        ...updatedInvoiceDetails,
        key: Date.now().toString(),
      };
      setInvoiceDetails((prev) => [...prev, newInvoice]);
      message.success("Invoice Details added successfully!");
    }

    form.resetFields();
    setIsModalOpen(false);
  };

  const deleteInvoice = (key: string) => {
    setInvoiceDetails((prev) => prev.filter((item) => item.key !== key));
    message.success("Invoice Details deleted successfully!");
  };

  const startEditing = (record: InvoiceData) => {
    setEditingKey(record.key);
    form.setFieldsValue({
      ...record,
      PoDate: record.PoDate ? moment(record.PoDate) : null,
      InvoiceDate: record.InvoiceDate ? moment(record.InvoiceDate) : null,
    });
    setIsModalOpen(true);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const filteredInvoice = invoiceDetails.filter(
    (item) =>
      (item.InvoiceDate && moment(item.InvoiceDate).format("MM/DD/YYYY").includes(searchTerm.toLowerCase())) ||
      item.InvoiceNumber.toString().includes(searchTerm.toLowerCase()) ||
      item.Supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||      
      (item.PoDate && moment(item.PoDate).format("MM/DD/YYYY").includes(searchTerm.toLowerCase())) ||
      item.PoNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.PoCost.toString().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Invoice Date",
      dataIndex: "InvoiceDate",
      key: "InvoiceDate",
      render: (date: Date | null) => {
        return date ? moment(date).format("MM/DD/YYYY") : "N/A";
      },
    },    
    {
      title: "Invoice Number",
      dataIndex: "InvoiceNumber",
      key: "InvoiceNumber",
    },
    {
      title: "Supplier Name",
      dataIndex: "Supplier",
      key: "Supplier",
    },
    {
      title: "Po Date",
      dataIndex: "PoDate",
      key: "PoDate",
      render: (date: Date | null) => {
        return date ? moment(date).format("MM/DD/YYYY") : "N/A";
      },
    },
    {
      title: "Po Number",
      dataIndex: "PoNumber",
      key: "PoNumber",
    },
    {
      title: "Po Cost",
      dataIndex: "PoCost",
      key: "PoCost",
    },
    {
      title: "Invoice",
      dataIndex: "InvoiceFilePath",
      key: "InvoiceFilePath",
      render: (InvoiceFile: string | null) => {
        return InvoiceFile ? (
          <a href="javascript:;" target="_self" rel="noopener noreferrer">
            <CloudDownloadOutlined style={{ fontSize: "18px", color: "#1890ff" }} />
          </a>
        ) : ("")
      }
    },
    {
      title: "Po",
      dataIndex: "PoFilePath",
      key: "PoFilePath",
      render: (PoFile: string | null) => {
        return PoFile ? (
          <a href="javascript:;" target="_self" rel="noopener noreferrer">
            <CloudDownloadOutlined style={{ fontSize: "18px", color: "#1890ff" }} />
          </a>
        ) : ("")
      }
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: InvoiceData) => (
        <Space>
          <Button type="link" onClick={() => startEditing(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this invoice?"
            onConfirm={() => deleteInvoice(record.key)}
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

  const [poCost, setPoCost] = useState<string>("");
  const handlePoCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Regex for numbers and fractions (e.g., 1/2, 3.14, 0.5)
    const regex = /^[0-9]+(\.[0-9]+)?$/;
    // Update state only if input matches the allowed pattern
    if (regex.test(newValue)) {
      setPoCost(newValue);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Invoice Details</Title>
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: "20px" }}
      >
        Add Invoice
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
          <Search placeholder="Search Invoice" onSearch={handleSearch} />
        </div>
        <div style={{ clear: "both" }}></div>
      </div>

      <Table
        dataSource={invoiceDetails}
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
        total={filteredInvoice.length}
        pageSize={pageSize}
        onChange={handlePageChange}
      />

      <Modal
        width={800}
        title={editingKey ? "Edit Invoice Details" : "Add Invoice Details"}
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
        <Form form={form} layout="vertical" onFinish={addOrUpdateInvoice}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Purchase Order Date" name="PoDate">
                <DatePicker size="small" format="MM/DD/YYYY" />
              </Form.Item>
              <Form.Item
                label="Supplier name"
                name="Supplier"
                rules={[
                  { required: true, message: "Supplier name is required!" },
                ]}
              >
                <Select placeholder="Supplier">
                  {SupplierOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Location" name="Location">
                <Select placeholder="Supplier">
                  {LocationOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Purchase order number" name="PoNumber">
                <Input placeholder="Enter PO Number"></Input>
              </Form.Item>
              <Form.Item
                label="Invoice Date"
                name="InvoiceDate"
                rules={[
                  { required: true, message: "Invoice date is required!" },
                ]}
              >
                <DatePicker size="small" format="MM/DD/YYYY" />
              </Form.Item>

              <Form.Item label="Upload PO" name="PoFilePath">
                <Upload
                  fileList={poFileList} // Use fileList instead of value
                  onChange={handlePoFileUpload}
                  beforeUpload={beforeUpload}
                  multiple={false}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload PO</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Purchase Cost" name="PoCost">
                <Input
                  placeholder="Enter PO Cost"
                  value={poCost}
                  onChange={handlePoCost}
                ></Input>
              </Form.Item>
              <Form.Item
                label="Invoice Number"
                name="InvoiceNumber"
                rules={[
                  { required: true, message: "Invoice number is required!" },
                ]}
              >
                <Input placeholder="Enter Invoice Number"></Input>
              </Form.Item>

              <Form.Item label="Upload Invoice" name="InvoiceFilePath">
                <Upload
                  fileList={invoiceFileList} // Use fileList instead of value
                  onChange={handleInvoiceFileUpload}
                  beforeUpload={beforeUpload}
                  multiple={false}
                >
                  <Button icon={<UploadOutlined />}>
                    Click to Upload Invoice
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Invoice;
