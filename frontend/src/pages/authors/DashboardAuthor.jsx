import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaBlog, FaPlusCircle, FaUser } from "react-icons/fa";
import { RiAiGenerate2 } from "react-icons/ri";
import UserLogout from "../../hook/UserLogout";
import AuthorUserProfile from "./AuthorUserProfile";


const menuItems = [
  {
    name: "Dashboard",
    icon: <BsGraphUpArrow />,
    path: "author/dashboard_home",
  },
  { name: "My Blogs", icon: <FaBlog />, path: "/author_blogs" },
  {
    name: "Create Blog",
    icon: <FaPlusCircle />,
    path: "/create_blog",
  },

  {
    name: "Generate Blog",
    icon: <RiAiGenerate2 />,
    path: "/generate_blog",
  },
  { name: "My Profile", icon: <FaUser />, path: "/author_profile" },
];

const DashboardAuthor = () => {
  const location = useLocation();
  const handleLogout = UserLogout();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`
      fixed md:static top-10 pt-6 left-0
      h-screen w-64
      bg-white dark:bg-gray-700 shadow-xl
      flex flex-col
      transform transition-transform duration-300 z-40
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0
    `}
      >
        <div className="flex mb-4 items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Author Dashboard
          </h1>

          <RxCross2
            className="text-2xl dark:text-white cursor-pointer md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        <AuthorUserProfile />

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

        <div className="mt-auto p-4">
          <button
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-2xl text-white font-semibold transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 text-gray-800 dark:text-white">
        <HiMenu
          className="text-2xl cursor-pointer md:hidden mb-4"
          onClick={() => setIsSidebarOpen(true)}
        />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardAuthor;
