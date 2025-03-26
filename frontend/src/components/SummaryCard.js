import React from "react";
import "../components/SummaryCard.css";

const SummaryCard = ({ title, value }) => {
  return (
    <div className="card shadow-sm text-center m-2">
      <div className="card-body">
        <h5 className="card-title text-muted fw-semibold mb-2">{title}</h5>
        <p className="fs-4 fw-bold text-dark">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
