import React, { useState } from "react";
import SearchBar from "../components/Searchbar";
import { Radar } from "react-chartjs-2";
import axios from "axios";

const Compare = () => {
  const [food1, setFood1] = useState(null);
  const [food2, setFood2] = useState(null);
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  const apiKey = process.env.REACT_APP_CHOMP_API_KEY;

  const fetchDetails = async (id, setFunc) => {
    const res = await axios.get(
      "https://chompthis.com/api/v2/food/branded.php",
      {
        params: { id, api_key: apiKey },
      }
    );
    setFunc(res.data);
  };

  const handleSelectFood1 = (item) => {
    setFood1(item);
    fetchDetails(item.id, setData1);
  };

  const handleSelectFood2 = (item) => {
    setFood2(item);
    fetchDetails(item.id, setData2);
  };

  const buildChartData = () => {
    if (!data1 || !data2) return null;

    return {
      labels: ["Calories", "Sugar", "Fat", "Protein", "Carbs"],
      datasets: [
        {
          label: food1.name,
          data: [
            data1.calories,
            data1.sugar,
            data1.total_fat,
            data1.protein,
            data1.carbohydrates,
          ],
        },
        {
          label: food2.name,
          data: [
            data2.calories,
            data2.sugar,
            data2.total_fat,
            data2.protein,
            data2.carbohydrates,
          ],
        },
      ],
    };
  };

  return (
    <div>
      <h1>Compare Foods</h1>

      <div style={{ display: "flex", gap: "2rem" }}>
        <div>
          <h3>Search for Food 1</h3>
          <SearchBar onSelectFood={handleSelectFood1} />
        </div>
        <div>
          <h3>Search for Food 2</h3>
          <SearchBar onSelectFood={handleSelectFood2} />
        </div>
      </div>

      {data1 && data2 && (
        <div style={{ width: "600px", margin: "2rem auto" }}>
          <Radar data={buildChartData()} />
        </div>
      )}
    </div>
  );
};

export default Compare;
