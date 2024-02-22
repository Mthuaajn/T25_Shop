import {
  faChartSimple,
  faFileExport,
  faFileLines,
  faTag,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../../constants/api";
import Loading from "../../../src/pages/LoadingError/Loading"
const TodaySales = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    async function fetchData() {
      const rs = await axios.get(api.getStatsToday, api.config);

      console.log("today sales: ",rs)
      if (rs.data.status === "success") {
        setData(rs.data.data.stats[0]);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="px-6 pt-4 pb-10 bg-white rounded-xl max-w-[800px]">
      <div className="flex justify-between">
        <div className="">
          <p className="font-semibold text-lg">Today's Sales</p>

          <p className="text-sm text-[#737791]">Sales Summary</p>
        </div>
      </div>
      {
         data ? (
          <div className="mt-8 flex justify-between">
            <div className="rounded-lg p-4 bg-[#FFE2E5] min-w-[200px]">
              <div className="rounded-full flex items-center justify-center w-8 h-8 bg-[#FA5A7D]">
                <FontAwesomeIcon icon={faChartSimple} color="#ffffff" />
              </div>
              <p className="mt-2 font-semibold text-xl">{data.totalOrders}</p>
              <p className="mt-2 text-sm">Total Order</p>
            </div>
            <div className="rounded-lg p-4 bg-[#FFF4DE] min-w-[200px]">
              <div className="rounded-full flex items-center justify-center w-8 h-8 bg-[#FF947A]">
                <FontAwesomeIcon icon={faFileLines} color="#ffffff" />
              </div>
              <p className="mt-2 font-semibold text-xl">{data.totalProducts}</p>
              <p className="mt-2 text-sm">Total Product</p>
            </div>

            <div className="rounded-lg p-4 bg-[#F3E8FF] min-w-[200px]">
              <div className="rounded-full flex items-center justify-center w-8 h-8 bg-[#BF83FF]">
                <FontAwesomeIcon icon={faTag} color="#ffffff" />
              </div>
              <p className="mt-2 font-semibold text-xl">${data.totalPrice}</p>
              <p className="mt-2 text-sm">Total Sales</p>
            </div>
          </div>
         ) : (<Loading/>)
      }
    
    </div>
  );
};

export default TodaySales;
