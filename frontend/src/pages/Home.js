import React from "react";
import SummaryCard from "../components/SummaryCard";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import RadarChart from "../components/RadarChart";

const Home = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>🍽️ Food Dashboard</h1>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <SummaryCard title="Popular Product" value="Coca-Cola" />
        <SummaryCard title="Avg Sugar (Snacks)" value="12g" />
        <SummaryCard title="Top Category" value="Snacks" />
      </div>

      {/* Charts */}
      <div style={{ display: "flex", gap: "2rem" }}>
        <div style={{ flex: 1 }}>
          <BarChart />
        </div>
        <div style={{ flex: 1 }}>
          <PieChart />
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <RadarChart />
      </div>
    </div>
  );
};

export default Home;
