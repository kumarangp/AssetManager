import React from "react";
import { Select } from "antd";

interface PageSizeProps {
  value : number;
  onChange: (value: number) => void;
}

const PageSize: React.FC<PageSizeProps> = ({value, onChange }) => {
  return(
    <div>
      <h4>Page Size:</h4>
      <Select
        value={value}
        style={{ width: 60, marginBottom: 5 }}
        onChange={(val) => onChange(val)}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
      </Select>
    </div>
  );
};

export default PageSize;
