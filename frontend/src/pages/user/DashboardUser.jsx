import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";

import DashboardUser from "../../component/DashboardUser/DashboardUser";
import DashboardAuthor from "../authors/DashboardAuthor";
import UserLogout from "../../hook/UserLogout";

/* ===== User Sidebar Menu ===== */
const menuItems = [
  {
    name: "Dashboard",
    icon: <BsGraphUpArrow />,
    path: "user/dashboard_home", // child route (Outlet)
  },
  {
    name: "My Profile",
    icon: <FaUser />,
    path: "my_profile",
  },
];

const Dashboard = () => {
  const user = useSelector((state) => state.auth?.user);
  const handleLogout = UserLogout();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /* ===== Safety check ===== */
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  /* ===== Author Dashboard ===== */
  if (user.role === "author") {
    return <DashboardAuthor />;
  }

  return (
    <div className="flex min-h-screen overflow-x-hidden  bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
      {/* ===== Sidebar ===== */}
      <aside
        className={`
          fixed md:static pt-6 top-8 left-0 
          h-screen w-64
          bg-white dark:bg-gray-700 shadow-xl
          flex flex-col
          transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex  items-center justify-between px-4 md:pt-2 pt-8">
          <h1 className="text-xl border-b w-full py-2 mb-4 font-bold text-gray-800 dark:text-gray-100">
            User Dashboard
          </h1>
          <RxCross2
            className="text-2xl cursor-pointer md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        <DashboardUser />

        <ul className="space-y-2 mt-4 px-2 font-semibold">
          {menuItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              onClick={() => setIsSidebarOpen(false)}
            >
              <li className="flex items-center gap-4 px-6 py-2 rounded-2xl hover:bg-violet-700 hover:text-white transition">
                {item.icon}
                {item.name}
              </li>
            </Link>
          ))}
        </ul>

        <div className="p-4 border-t mt-auto border-gray-200 dark:border-gray-700">
          <button
            className="w-full py-2.5 rounded-xl
                   bg-red-600 hover:bg-red-700
                   text-white font-semibold
                   transition duration-200 shadow-md hover:shadow-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 p-4 text-gray-800 dark:text-white">
        <HiMenu
          className="text-2xl cursor-pointer md:hidden mb-4"
          onClick={() => setIsSidebarOpen(true)}
        />

        {/* Child Routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
