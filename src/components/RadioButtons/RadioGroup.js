import React from 'react';

const RadioGroup = ({ value, onChange, children }) => {
  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            checked: child.props.value === value,
            onChange: onChange,
          });
        }
        return child;
      })}
    </div>
  );
};

export default RadioGroup;
