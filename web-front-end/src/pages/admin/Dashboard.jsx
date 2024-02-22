import {
  LatestOrders,
  TodaySales,
  TopProducts,
  TotalRevenue,
} from "../../components/admin";

const Dashboard = () => {
  return (
    <div className="py-8 px-4">
      <TodaySales />
      <div className="flex mt-4 gap-10">
        <TotalRevenue />
        <TopProducts />
      </div>
      <div className="mt-4">
        <LatestOrders />
      </div>
    </div>
  );
};

export default Dashboard;
