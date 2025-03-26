import React from "react";
import "./SkeletonLoader.css";

const SkeletonLoader = () => {
  return (
    <div className="card mt-4 shadow-sm">
      <div className="card-body">
        <div className="skeleton-card">
          <div className="skeleton-title mb-3"></div>
          <div className="skeleton-line short mb-2"></div>
          <div className="skeleton-line mb-2"></div>
          <div className="skeleton-line"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
