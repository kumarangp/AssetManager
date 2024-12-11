import React, { useState } from "react";
import { Input } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

interface SearchProps {
  placeholder?: string;
  onSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ placeholder = "Search...", onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = () => {
    const trimmedSearchValue = searchValue.trim();
    if (trimmedSearchValue) {
      onSearch(searchValue);
    }    
  };

  const handleClear = () => {    
    setSearchValue("");
    onSearch("");    
  };

  return (    
    <>    
      <h4>Search:</h4>
      <div style={{ display: "flex", gap: "8px", alignItems: "center", position: "relative" }}>
      <Input      
        id="SeachInput"
        className="ant-input"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onPressEnter={handleSearch}
        onKeyUp={handleSearch}
        style={{ width: 200, paddingRight: "30px", fontWeight:"600", marginBottom: "10px", boxShadow: "rgba(0, 0, 0, 0.08) 0px 0px 2px 2px"}}       
      />
      {searchValue && (
        <CloseCircleFilled
          onClick={handleClear}
          style={{
            position: 'absolute', right: '4%', top: '40%', 
            transform: 'translateY(-50%)', color: 'rgba(0,0,0,.45)',
            cursor: 'pointer', zIndex: 10
          }}
        />
      )}
    </div>
    </>
  );
};

export default Search;
