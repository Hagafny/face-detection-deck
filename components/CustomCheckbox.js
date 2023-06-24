import React from 'react';
import theme from '../theme/base'

const backgroundColor = theme.PRIMARY

const CustomCheckbox = ({ label, checked, onChange }) => {
  const handleCheckboxChange = () => {
    onChange(!checked);
  };


  return (
    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '4px',
          marginRight: '10px',
          backgroundColor: checked ? backgroundColor : '#FFFFFF',
          border: `1px solid ${backgroundColor}`,
        }}
        onClick={handleCheckboxChange}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#FFFFFF"
            width="16px"
            height="16px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16.2l-3.2-3.2L4 15l5 5 10-10-1.4-1.4L9 16.2z" />
          </svg>
        )}
      </div>
      {label}
      <input type="checkbox" style={{ display: 'none' }} checked={checked} onChange={handleCheckboxChange} />
    </label>
  );
};

export default CustomCheckbox;
