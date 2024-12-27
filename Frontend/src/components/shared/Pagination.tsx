import React from "react";
import { Pagination as AntPagination } from "antd";

interface PaginationProps {
  current: number; // Current page
  total: number; // Total number of items
  pageSize: number; // Number of items per page
  onChange: (page: number, pageSize: number) => void; // Function to handle page change
}

const Pagination: React.FC<PaginationProps> = ({ current, total, pageSize, onChange }) => {
  const startItem = (current - 1) * pageSize + 1; // Calculate start item
  const endItem = Math.min(current * pageSize, total); // Calculate end item

  return (
    <div style={{ textAlign: "center", marginTop: "16px" }}>
      <div style={{ float: "left" }}>
        <AntPagination className="customPagination"
          current={current}
          total={total}
          pageSize={pageSize}
          onChange={onChange}
          showSizeChanger // Allow changing page size
          pageSizeOptions={["5", "10", "25"]} // Allowed page sizes
        />
      </div>
      <div style={{ float: "left", marginLeft: "20px", marginTop: "10px" }}>
        <div style={{ marginBottom: "8px", fontSize: "14px", color: "#555" }}>
          {`${startItem}-${endItem} of ${total} items`}
        </div>
      </div>
      <div style={{ clear: "both" }}></div>
    </div>
  );
};

export default Pagination;
