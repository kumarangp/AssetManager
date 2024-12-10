import React, { useState, useRef } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface SharedSearchComponentProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  buttonText?: string;
  style?: React.CSSProperties;
  allowClear?: boolean;
}

const SharedSearchComponent: React.FC<SharedSearchComponentProps> = ({
  onSearch, 
  placeholder = "Search...", 
  buttonText = "Search",
  style,
  allowClear = true
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const inputRef = useRef<any>(null);

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      onSearch(trimmedTerm);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
    
    // Ensure input regains focus immediately
    inputRef.current?.focus();
  };

  return (
    <div 
      style={{
        display: 'flex', 
        maxWidth: 600, 
        margin: '0 auto',
        alignItems: 'center',
        ...style
      }}
    >
      <div style={{ position: 'relative', flex: 1, marginRight: 8 }}>
        <Input 
          ref={inputRef}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ 
            paddingRight: allowClear && searchTerm ? '30px' : '10px' 
          }}
        />
        {allowClear && searchTerm && (
          <CloseCircleOutlined 
            onClick={handleClear}
            style={{ 
              position: 'absolute', 
              right: 10, 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: 'rgba(0,0,0,.45)', 
              cursor: 'pointer',
              zIndex: 10
            }}
          />
        )}
      </div>
      <Button 
        type="primary" 
        icon={<SearchOutlined />}
        onClick={handleSearch}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default SharedSearchComponent;