import React, { useState } from "react";
import moment, { Moment } from "moment";
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
  Checkbox,
  Tooltip,
} from "antd";
import { DeleteOutlined, UserDeleteOutlined, UserOutlined, EditOutlined } from "@ant-design/icons";

import Pagination from "../shared/Pagination";
import Search from "../shared/Search";
import Status from "../shared/Status";


const { Title } = Typography;
const { Option } = Select;

interface SerialTableRow {
  key: string;
  serial: string;
  remarks: string;
}

// Interface for data stored in state
interface AssetData {
  key: string;
  AssetCategory: string;
  WarrantyExpiration?: number;
  Manufacturer?: string;
  Model?: string;
  ModelNumber?: string;
  Location?: string;
  AssignedDate?: Date | null;
  SupplierName?: string;
  InvoiceNumber?: string;
  IsReplacementAsset: boolean;

  InvoiceDate?: Date;
  AssetTag?: string;
  AssetType?: string;
  AssetStatus?: string;
  AssignedUser?: string;
  AssignedUserId?: string;
  AssignedToAsset?: string;
  Serial?: string;
  Remarks?: string;
}

// Interface for form values
interface AssetFormValues {
  key: string;
  AssetCategory: string;
  WarrantyExpiration: number;
  Manufacturer: string;
  Model: string;
  ModelNumber: string;
  Location: string;
  AssignedDate: Moment | null;
  SupplierName: string;
  InvoiceNumber: string;
  IsReplacementAsset: boolean;
  serialRows: SerialTableRow[];
}

interface AssignAsset_to_user {  
  key: string;
  AssignUser: string;  
}

const Asset: React.FC = () => {
  const [form] = Form.useForm<AssetFormValues>();
  const [assignAssetToUserform] = Form.useForm<AssignAsset_to_user>();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("All");
  const [assetDetails, setAssetDetails] = useState<AssetData[]>([]);

  const SupplierOptions = ["Supplier 1", "Supplier 2", "Supplier 3"];
  const LocationOptions = ["AKS", "USA"];
  const AssetCategoryOptions = [
    "Battery",
    "Power Adapter",
    "Hard Disk",
    "Power Supply",
  ];
  const ManufacturerOptions = ["Dell", "HP", "Apple", "IBM"];
  const ModelOptions = ["Model-1", "Model-2", "Model-3"];
  const ModelNumberOptions = [
    "Model Number 1",
    "Model Number 2",
    "Model Number 3",
  ];
  const InvoiceNumberOptions = [
    "Inv-001-12-24",
    "Inv-258-04-23",
    "Invoice number 3",
  ];

  const [serialRows, setSerialRows] = useState<SerialTableRow[]>([]);

  const handleAddRow = () => {
    const newRow: SerialTableRow = {
      key: Date.now().toString(),
      serial: "",
      remarks: "",
    };
    setSerialRows([...serialRows, newRow]);
  };

  const handleDeleteRow = (key: string) => {
    setSerialRows(serialRows.filter((row) => row.key !== key));
  };

  const handleSerialChange = (key: string, value: string) => {
    setSerialRows(
      serialRows.map((row) =>
        row.key === key ? { ...row, serial: value } : row
      )
    );
  };

  const handleRemarksChange = (key: string, value: string) => {
    setSerialRows(
      serialRows.map((row) =>
        row.key === key ? { ...row, remarks: value } : row
      )
    );
  };

  const serialColumns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      render: (text: string, record: SerialTableRow) => (
        <Input
          value={text}
          onChange={(e) => handleSerialChange(record.key, e.target.value)}
          className="w-full"
        />
      ),
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      render: (text: string, record: SerialTableRow) => (
        <Input
          value={text}
          onChange={(e) => handleRemarksChange(record.key, e.target.value)}
          className="w-full"
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: SerialTableRow) => (
        <Button type="link" danger onClick={() => handleDeleteRow(record.key)}>
          Delete
        </Button>
      ),
    },
  ];

  const handleOpenModal = () => {
    form.resetFields();
    // Set default values when opening the modal
    form.setFieldsValue({
      AssignedDate: moment(), // Set current date as default
      IsReplacementAsset: false, // Set checkbox unchecked by default
    });
    setEditingKey(null);
    setIsModalOpen(true);
    setSerialRows([]); // Reset serial rows when opening modal
  };

  const handleCloseModal = () => {
    form.resetFields();
    setEditingKey(null);
    setIsModalOpen(false);
  };

  const addOrUpdateAsset = (values: AssetFormValues) => {
    if (serialRows.length === 0) {
      // If no serial rows, create single asset
      const newAsset: AssetData = {
        ...values,
        key: Date.now().toString(),
        AssignedDate: values.AssignedDate ? values.AssignedDate.toDate() : null,
        IsReplacementAsset: values.IsReplacementAsset || false,
      };

      if (editingKey) {
        setAssetDetails((prev) =>
          prev.map((item) => (item.key === editingKey ? newAsset : item))
        );
      } else {
        setAssetDetails((prev) => [...prev, newAsset]);
      }
    } else {
      // Create separate asset record for each serial number
      const newAssets = serialRows.map((row, index) => ({
        ...values,
        key: `${Date.now()}-${index}`,
        AssignedDate: values.AssignedDate ? values.AssignedDate.toDate() : null,
        IsReplacementAsset: values.IsReplacementAsset || false,
        Serial: row.serial,
        Remarks: row.remarks,
      }));

      if (editingKey) {
        // Remove old record and add new ones
        setAssetDetails((prev) => {
          const filtered = prev.filter((item) => item.key !== editingKey);
          return [...filtered, ...newAssets];
        });
      } else {
        setAssetDetails((prev) => [...prev, ...newAssets]);
      }
    }

    message.success(
      editingKey
        ? "Asset details updated successfully!"
        : "Asset details added successfully!"
    );
    setSerialRows([]);
    setIsModalOpen(false);
    form.resetFields();
  };

  const deleteAsset = (key: string) => {
    setAssetDetails((prev) => prev.filter((item) => item.key !== key));
    message.success("Asset details deleted successfully!");
  };

  const startEditing = (record: AssetData) => {
    setEditingKey(record.key);
    form.setFieldsValue({
      ...record,
      AssignedDate: record.AssignedDate ? moment(record.AssignedDate) : null,
      IsReplacementAsset: record.IsReplacementAsset || false,
    });

    // If record has serial and remarks, create a serial row
    if (record.Serial || record.Remarks) {
      setSerialRows([
        {
          key: Date.now().toString(),
          serial: record.Serial || "",
          remarks: record.Remarks || "",
        },
      ]);
    } else {
      setSerialRows([]);
    }

    setIsModalOpen(true);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const filteredAsset = assetDetails.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.AssetCategory?.toLowerCase().includes(searchLower) ||
      item.WarrantyExpiration?.toString().includes(searchLower) ||
      item.Manufacturer?.toLowerCase().includes(searchLower) ||
      item.Model?.toLowerCase().includes(searchLower) ||
      item.ModelNumber?.toLowerCase().includes(searchLower) ||
      item.Location?.toLowerCase().includes(searchLower) ||
      (item.AssignedDate && moment(item.AssignedDate).format("MM/DD/YYYY").includes(searchLower)) ||
      item.SupplierName?.toLowerCase().includes(searchLower) ||
      item.InvoiceNumber?.toLowerCase().includes(searchLower) ||
      
      item.AssetTag?.toLowerCase().includes(searchLower) ||      
      item.AssetType?.toLowerCase().includes(searchLower) ||      
      item.Serial?.toLowerCase().includes(searchLower) ||
      item.AssignedUser?.toLowerCase().includes(searchLower) ||
      item.AssetStatus?.toLowerCase().includes(searchLower) ||   
      item.AssignedUser?.toLowerCase().includes(searchLower) ||
      item.AssignedUserId?.toLowerCase().includes(searchLower) ||
      item.AssignedToAsset?.toLowerCase().includes(searchLower) ||
      item.Remarks?.toLowerCase().includes(searchLower)       
    );
  });

  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);
  // Show the modal
  const showAssignModal = () => {
    setIsAssignModalVisible(true);     
  };
   // Close the modal
  const handleAssignModalCancel = () => {
    setIsAssignModalVisible(false);    
    assignAssetToUserform.resetFields();
  };
  // Assign asset 
  const handleAssignAsset = () => {
    // Add assign modal form submit logic here     
    console.log("Assign asset to the user - Submit");
    setIsAssignModalVisible(false); 
  };

  const sampleUser = ['Sample user 1', 'Sample user 2'];

  const columns = [
    { title: "Invoice Date", dataIndex: "InvoiceDate", key: "InvoiceDate" },
    { title: "Invoice#", dataIndex: "InvoiceNumber", key: "InvoiceNumber" },
    { title: "Asset Tag", dataIndex: "AssetTag", key: "AssetTag" },
    { title: "Category", dataIndex: "AssetCategory", key: "AssetCategory" },
    { title: "Asset Type", dataIndex: "AssetType", key: "AssetType" },
    { title: "Manufacturer", dataIndex: "Manufacturer", key: "Manufacturer" },
    { title: "Model", dataIndex: "Model", key: "Model" },
    { title: "Serial", dataIndex: "Serial", key: "Serial" },
    { title: "Status", dataIndex: "AssetStatus", key: "AssetStatus" },
    { title: "Assigned User", dataIndex: "AssignedUser", key: "AssignedUser" },
    {
      title: "Assigned User Id",
      dataIndex: "AssignedUserId",
      key: "AssignedUserId",
    },
    {
      title: "Assigned to Asset",
      dataIndex: "AssignedToAsset",
      key: "AssignedToAsset",
    },
    { title: "Location", dataIndex: "Location", key: "Location" },
    {
      title: "Warranty",
      dataIndex: "WarrantyExpiration",
      key: "WarrantyExpiration",
    },
    { title: "Remarks", dataIndex: "Remarks", key: "Remarks" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: AssetData) => (
        <Space>
          {(record.AssetStatus === "In Store" ||
            record.AssetStatus === "Assigned" ||
            record.AssetStatus === "Installed") && (
            <Tooltip title="Edit asset">
              {/* EDIT Button */}
              <Button
                type="primary"
                icon={<EditOutlined />}
                shape="circle"
                style={{
                  backgroundColor: "#faad14",
                  borderColor: "#faad14",
                  color: "white",
                }}
                onClick={() => startEditing(record)}
              ></Button>
            </Tooltip>
          )}
          <Tooltip title="Assign asset">
            {/* Assign Asset */}
            <Button
              type="primary"
              icon={<UserOutlined />}
              shape="circle"
              onClick={showAssignModal}
              style={{
                backgroundColor: "#00b300",
                borderColor: "#00b300",
                color: "white",
              }}
            ></Button>
            <Modal
              width={500}
              title="Assign asset : asset tag goes here"
              open={isAssignModalVisible}
              onCancel={handleAssignModalCancel}
              footer={[
                <Button key="cancel" onClick={handleAssignModalCancel}>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  onClick={() => assignAssetToUserform.submit()}
                >
                  Assign
                </Button>,
              ]}
            >
              <Form layout="vertical" onFinish={handleAssignAsset} form={assignAssetToUserform}>
                <Form.Item
                  label="User"
                  name="User"
                  rules={[
                    { required: true, message: "Please select user!" },
                  ]}
                >
                  <Select placeholder="Select user">
                    {sampleUser.map((item) => <Option key={item} value={item}>{item}</Option>)}
                  </Select>
                </Form.Item>
              </Form>
            </Modal>
          </Tooltip>
          <Tooltip title="Unassign asset">
            <Button
              type="primary"
              icon={<UserDeleteOutlined />}
              shape="circle"
              style={{
                backgroundColor: "#f50",
                borderColor: "#f50",
                color: "white",
              }}
            ></Button>
          </Tooltip>
          <Popconfirm
            title="Are you sure to delete this asset?"
            onConfirm={() => deleteAsset(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete asset">
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                shape="circle"
                style={{
                  backgroundColor: "#c00",
                  borderColor: "#c00",
                  color: "white",
                }}
              ></Button>
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];



  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Asset Details</Title>
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: "20px" }}
      >
        Add Asset
      </Button>
      <div>
        <div style={{ float: "left" }}>
          <Status
            type="AssetStatus"
            value={status}
            onChange={(value) => setStatus(value)}
            width={150}
          />
        </div>
        <div style={{ float: "right" }}>
          <Search placeholder="Search Asset" onSearch={handleSearch} />
        </div>
        <div style={{ clear: "both" }}></div>
      </div>

      <Table
        dataSource={filteredAsset}
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
        total={filteredAsset.length}
        pageSize={pageSize}
        onChange={handlePageChange}
      />

      <Modal
        width={1600}
        title={editingKey ? "Edit Asset Details" : "Add Asset Details"}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={addOrUpdateAsset}
          initialValues={{
            AssignedDate: moment(),
            IsReplacementAsset: false,
          }}
        >
          <Row gutter={16}>
            <Col span={3}>
              <Form.Item
                label="Asset Category"
                name="AssetCategory"
                rules={[
                  { required: true, message: "Asset category is required!" },
                ]}
              >
                <Select placeholder="Asset category">
                  {AssetCategoryOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Assigned Date" name="AssignedDate">
                <DatePicker size="small" format="MM/DD/YYYY" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label="Warranty/Expiration(in Months)"
                name="WarrantyExpiration"
              >
                <Input placeholder="Warranty" />
              </Form.Item>
              <Form.Item label="Supplier" name="SupplierName">
                <Select placeholder="Supplier Name">
                  {SupplierOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="Manufacturer" name="Manufacturer">
                <Select placeholder="Manufacturer">
                  {ManufacturerOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Invoice Number" name="InvoiceNumber">
                <Select placeholder="Invoice Number" showSearch>
                  {InvoiceNumberOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="Model" name="Model">
                <Select placeholder="Model">
                  {ModelOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Serial Number" name="Serial" style={{ display: editingKey ? "block" : "none"}}>
                  <Input placeholder="Serial Number"></Input>
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="Model Number" name="ModelNumber">
                <Select placeholder="Model Number">
                  {ModelNumberOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Remarks" name="Remarks" style={{ display: editingKey ? "block" : "none"}}>
                  <Input placeholder="Remarks"></Input>
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="Location" name="Location">
                <Select placeholder="Location">
                  {LocationOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Asset Tag" name="AssetTag" style={{ display: editingKey ? "block" : "none"}}>
                  <Input placeholder="Asset Tag" disabled></Input>
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item
                label="Is Replacement Asset"
                name="IsReplacementAsset"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            </Col>
          </Row>
          {/* Save and Cancel buttons */}
          <Row gutter={16}>
            <Col span={19}>
              <div>
                <div style={{ float: "right" }}>
                  <Space>
                    <Button key="cancel" onClick={handleCloseModal}>
                      Cancel
                    </Button>
                    <Button
                      key="submit"
                      type="primary"
                      onClick={() => form.submit()}
                    >
                      {editingKey ? "Update" : "Save"}
                    </Button>
                  </Space>
                </div>
                <div style={{ clear: "both" }}></div>
              </div>
            </Col>
          </Row>
          {!editingKey && 
          <Row gutter={12}>
            <Col span={12}>
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <Title level={5}>Serial Numbers and Remarks</Title>
                  <Button type="primary" onClick={handleAddRow}>
                    Add Row
                  </Button>
                </div>
                <Table
                  columns={serialColumns}
                  dataSource={serialRows}
                  pagination={false}
                  className="w-full"
                />
              </div>
            </Col>
          </Row>
          }
        </Form>
      </Modal>
    </div>
  );
};

export default Asset;


// Edit button
// -- Show only when asset status = 'In Store', 'Assigned', 'Installed' 