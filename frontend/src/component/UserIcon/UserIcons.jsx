import react, { useEffect, useRef } from "react";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserLogout from "../../hook/UserLogout";
import { useSelector } from "react-redux";

const UserIcons = () => {
  const user = useSelector((state) => state.auth?.user);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const menuRef = useRef();
  const handleLogout = UserLogout();

  useEffect(() => {
    const handleOutSideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setDashboardOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutSideClick);
    return () => document.removeEventListener("mousedown", handleOutSideClick);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="rounded-full bg-gray-400 mr-10 cursor-pointer w-10 h-10 flex items-center justify-center text-white hover:ring-2 hover:ring-blue-400 transition"
        onClick={() => setDashboardOpen(!dashboardOpen)}
      >
        <FaUserCircle size={40} />
      </div>

      {/*    dropdown */}
      {dashboardOpen && (
        <div className="absolute  right-0 w-30  bg-white dark:bg-white  text-white  dark:text-gray-800 rounded-xl  shadow-xl ">
          <div>
            <span className="cursor-pointer flex items-center gap-3 w-full px-2 py-1 text-sm text-gray-900 hover:bg-gray-100 rounded-t-xl">
              {user?.role === "user" ? (
                <Link to="user/dashboard_home"> Dashbaord</Link>
              ) : (
                <Link to="author/dashboard_home"> Dashbaord</Link>
              )}
            </span>
            <span
              className="cursor-pointer flex items-center gap-3 w-full px-2 py-1 text-sm text-gray-900 hover:bg-gray-100 rounded-t-xl"
              onClick={handleLogout}
            >
              <Link> Logout</Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserIcons;
