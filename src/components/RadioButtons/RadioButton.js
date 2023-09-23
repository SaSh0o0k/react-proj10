// RadioButton.js
import React from 'react';

const RadioButton = ({ value, checked, onChange, label }) => {
  return (
    <label>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default RadioButton;
