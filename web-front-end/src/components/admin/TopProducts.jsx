import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../constants/api";

const TopProducts = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const rs = await axios.get(api.getStatsProduct, api.config);
      console.log('top products: ',rs)
      if (rs.data.status === "success") {
        setData(rs.data.data.stats);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="px-6 pt-4 pb-10 bg-white rounded-xl max-w-[1100px]">
      <div className="flex justify-between">
        <div className="">
          <p className="font-semibold text-lg">Top Products</p>
        </div>
      </div>
      <table className="mt-4 min-w-[500px]">
        <thead>
          <tr className="mb-4  text-left">
            <th className="font-normal text-[#96A5B8]">#</th>
            <th className="font-normal text-[#96A5B8]">Name</th>
            <th className="font-normal text-[#96A5B8]">Price</th>
            <th className="font-normal text-[#96A5B8]">Order</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element, index) => (
            <tr className=" mb-4 border-t" key={index}>
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{element.name}</td>
              <td className="py-2">{element.price}</td>
              <td className="py-2">
                <span className="bg-[#F0F9FF] text-[#0095FF] border border-[#0095FF] rounded-lg px-3 text-sm font-semibold text-center">
                  {element.numOrder}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProducts;
