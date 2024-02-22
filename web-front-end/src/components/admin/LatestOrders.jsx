import { faEye, faFileExport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../constants/api";
import { Link } from "react-router-dom";

const LatestOrders = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const rs = await axios.get(api.getStatsOrder, api.config);
      console.log("latest orders : ", rs.data)
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
          <p className="font-semibold text-lg">Latest Orders</p>
        </div>
      </div>
      <table className="mt-4 min-w-[1000px]">
        <thead>
          <tr className="mb-4  text-left">
            <th className="font-normal text-[#96A5B8]">Username</th>
            <th className="font-normal text-[#96A5B8]">Email</th>
            <th className="font-normal text-[#96A5B8]">Price</th>
            <th className="font-normal text-[#96A5B8]">Status</th>
            <th className="font-normal text-[#96A5B8]">Date</th>
            <th className="font-normal text-[#96A5B8]">Detail</th>
          </tr>
        </thead>
        <tbody>
          { data && data.map((element, index) => (
            <tr className="mb-4 border-t" key={index}>
              <td className="py-2 font-semibold">
                {element.userDetails?.username}
              </td>
              <td className="italic text-primary">
                <Link to={`mailto:${element.userDetails?.email}`}>{element.userDetails?.email}</Link>
              </td>
              <td>{element.price}</td>
              <td>
             
                    <span className="bg-[#DCFCE7] rounded-xl py-1 px-3 text-sm font-semibold">
                      Paid
                    </span>
                 
               
              </td>
              <td>{element.createdAt.split("T")[0]}</td>
              <td>
                <Link to={`/admin/order/${element?._id}`}>
                  <FontAwesomeIcon icon={faEye} color="#00E096" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatestOrders;
