import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { api } from "../../constants/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TotalRevenue = () => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const rs = await axios.get(api.getChartData, api.config);
      console.log("total revenue: ", rs);
      if (rs.data.status === "success") {
        setChartData(rs.data.data.stats);
      }
    }

    fetchData();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Price",

        data: chartData.map((item) => {
          if (item === 0) return 0;
          return item.totalPrice;
        }),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="px-6 pt-4 pb-10 bg-white rounded-xl max-w-[1100px]">
      <div className="flex justify-between">
        <div className="">
          <p className="font-semibold text-lg">Total Revenue</p>
        </div>
      </div>
      <div className="mt-4 min-w-[500px]">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default TotalRevenue;
