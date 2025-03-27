import React from "react";
import "../components/WidgetHeader.css"; // Add your CSS here

const WidgetHeader = ({ title }) => {
  return (
    <div className="widgetHeader">
      <h1>{title}</h1>
    </div>
  );
};

export default WidgetHeader;
