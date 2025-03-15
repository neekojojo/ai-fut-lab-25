
import React from 'react';

interface ChartContainerProps {
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ children }) => {
  // Check if children is a valid React element or convert it to one
  const validChildren = React.isValidElement(children) 
    ? children 
    : <>{children}</>; // Wrap non-element children in a fragment

  return (
    <div className="chart-container">
      {validChildren}
    </div>
  );
};

export default ChartContainer;
