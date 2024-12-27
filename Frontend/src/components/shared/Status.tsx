import React from "react";
import { Select } from "antd"; 

const { Option } = Select;

interface StatusProps {
  type?: "Default" | "AssetStatus"; // Determines which dropdown to show
  value: string; // Current Selected value
  onChange: (value: string) => void; // Function to handle change  
  width?: number | string;
}

const Status: React.FC<StatusProps> = ({ type = "Default", value, onChange, width = 100 }) => {
  // Options for both dropdowns
  const defaultOptions = ["Active", "Inactive"];
  const assetStatusOptions = [
    "All", "In Store", "Assigned", "Scrap", "Lost/Stolen",
    "Damaged/Repair", "Installed"
  ];

  // Determine the options based on the type prop.
  const options = type === "AssetStatus" ? assetStatusOptions : defaultOptions;

  return (
    <div className="customStatus">
      <h4>Status:</h4>
      <Select
        value={value}
        onChange={onChange}
        style={{ width: width, boxShadow: "rgba(0, 0, 0, 0.08) 0px 0px 2px 2px" }}
        placeholder="Select Status"         
      >
        {
          options.map((option) =>
          (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))
        }
      </Select>
    </div>
  );
};

export default Status;


