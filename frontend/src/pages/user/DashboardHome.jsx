import React from "react";

const DashboardHome = () => {
  return (
    <div>
      <main className="flex-1 p-6 text-gray-800 dark:text-white">
        <h2 className="text-2xl px-2 md:px-6 font-bold mb-2">
          Welcome to Dashboard👋
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow">
            <h3 className="text-lg font-semibold">Total Blogs</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow">
            <h3 className="text-lg font-semibold">Views</h3>
            <p className="text-3xl font-bold mt-2">1K</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;
