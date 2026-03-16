import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../../feature/authorDashbaord";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading) return <h2 className="text-center mt-10 text-xl">Loading...</h2>;

  if (error) return <h2 className="text-center mt-10 text-red-500">{error}</h2>;

  // 📊 Simple Bar Chart Data
  const chartData = {
    labels: ["Total Posts", "Published", "Views"],
    datasets: [
      {
        label: "Dashboard Stats",
        data: [
          stats?.totalPosts || 0,
          stats?.published || 0,
          stats?.totalViews || 0,
        ],
        backgroundColor: ["#3b82f6", "#22c55e", "#f59e0b"],
      },
    ],
  };

  return (
    <div className="p-6 space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Total Posts" value={stats?.totalPosts} />
        <Card title="Published" value={stats?.published} />
        <Card title="Drafts" value={stats?.drafts} />
        <Card title="Total Views" value={stats?.totalViews} />
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 dark:text-gray-300">
          Overview Analytics:-
        </h2>
        <Bar data={chartData} className="dark:bg-gray-200"/>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-900 dark:text-gray-300 shadow p-6 rounded-xl text-center transition hover:scale-105">
    <h3 className="text-gray-500 dark:text-gray-400">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value || 0}</p>
  </div>
);

export default Dashboard;
