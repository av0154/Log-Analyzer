import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ["File Access", "System Command Execution"],
  datasets: [
    {
      label: "Unauthorized Access Attempts",
      data: [3, 5], // Example counts
      backgroundColor: ["#f87171", "#60a5fa"],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Unauthorized Access Attempts by Type" },
  },
};

const AccessLogsChart = () => {
  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default AccessLogsChart;
