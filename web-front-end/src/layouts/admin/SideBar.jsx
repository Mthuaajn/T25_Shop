import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faCartShopping,
  faBagShopping,
  faTableCells,
  faUsers,
  faPercent,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  return (
    <div className="min-w-[210px] bg-white px-4 py-8">
      <Link to="/admin" className="flex items-center gap-4 ">
        <div className="w-10 h-10 bg-main rounded-md flex items-center justify-center">
          <img src="/images/dummy.png" alt="" className="w-5 h-5" />
        </div>
        <span className="text-black font-semibold text-2xl">ADMIN</span>
      </Link>
      <div className="flex  flex-col mt-10 text-[#737791] gap-6">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive
              ? " bg-main text-white font-semibold  rounded-xl py-2 px-4 flex items-center gap-3"
              : "px-4 flex items-center gap-3"
          }
        >
          <FontAwesomeIcon icon={faChartPie} />
          Dashboard{" "}
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? " bg-main text-white font-semibold  rounded-xl py-2 px-4 flex items-center gap-3"
              : "px-4 flex items-center gap-3"
          }
        >
          <FontAwesomeIcon icon={faCartShopping} />
          Orders
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? " bg-main text-white font-semibold  rounded-xl py-2 px-4 flex items-center gap-3"
              : "px-4 flex items-center gap-3"
          }
        >
          <FontAwesomeIcon icon={faBagShopping} />
          Products
        </NavLink>
        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            isActive
              ? " bg-main text-white font-semibold  rounded-xl py-2 px-4 flex items-center gap-3"
              : "px-4 flex items-center gap-3"
          }
        >
          <FontAwesomeIcon icon={faTableCells} />
          Categories{" "}
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? " bg-main text-white font-semibold  rounded-xl py-2 px-4 flex items-center gap-3"
              : "px-4 flex items-center gap-3"
          }
        >
          <FontAwesomeIcon icon={faUsers} />
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
