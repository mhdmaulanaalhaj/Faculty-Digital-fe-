import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Add this import if you use Redux
import { useToast } from "@chakra-ui/react"; // Adjust this if you use another UI library for notifications

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueBarChart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Add this line if you use Redux
  const toast = useToast(); // Adjust this line if you use another UI library for notifications

  const handleLogout = () => {
    localStorage.removeItem("auth");
    dispatch({
      type: "logout",
    });
    navigate("/login");
    toast({
      title: "Anda telah logout",
      status: "success",
      position: "top",
      duration: 3000,
      isClosable: false,
    });
  };

  // State untuk menyimpan data Revenue
  const [revenueData, setRevenueData] = useState([]);

  // Fungsi untuk mengambil data dari server
  const fetchRevenueData = async () => {
    try {
      const response = await fetch("http://localhost:2000/revenue"); // Replace with your backend URL
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setRevenueData(data);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  useEffect(() => {
    // Panggil fungsi fetch saat komponen dimuat
    fetchRevenueData();
  }, []);

  // Data dan options untuk bar chart
  const data = {
    labels: revenueData.map((entry) => `${entry.month} ${entry.year}`),
    datasets: [
      {
        label: "Revenue (in USD)",
        data: revenueData.map((entry) => entry.revenue),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue Report of the Company",
      },
    },
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        style={{
          margin: "10px",
          padding: "10px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Logout
      </button>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RevenueBarChart;
