import React from "react";

const SummaryCard = ({ title, value }) => {
  return (
    <div
      style={{
        background: "#f9f9f9",
        borderRadius: "10px",
        padding: "1.5rem",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        flex: "1",
        textAlign: "center",
      }}
    >
      <h3>{title}</h3>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value}</p>
    </div>
  );
};

export default SummaryCard;
