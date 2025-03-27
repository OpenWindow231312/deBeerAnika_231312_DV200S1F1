import React from "react";
import "../components/WidgetHeaderCompare.css"; // Add your CSS here

const WidgetHeaderCompare = ({ title }) => {
  return (
    <div className="widgetHeaderCompare">
      <h1>{title}</h1> {/* Dynamic title */}
    </div>
  );
};

export default WidgetHeaderCompare;
