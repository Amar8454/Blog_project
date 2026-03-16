import React from "react";
import { useSelector } from "react-redux";

const DashboardUser = () => {
  const auth = useSelector((state) => state.auth?.user);

  return (
    <div className="px-4 py-2">
      {auth && (
        <div
          className="flex items-center gap-4 p-3 
                    bg-gray-100 dark:bg-gray-900 
                    rounded-2xl shadow-md hover:shadow-lg 
                    transition duration-300"
        >
          <div className="relative">
            <img
              src={auth?.profileImage}
              alt="user"
              className="w-14 h-14 rounded-full object-cover 
                     border-2 border-indigo-500"
            />
            <span
              className="absolute bottom-0 right-0 
                         w-3 h-3 bg-green-500 
                         border-2 border-white rounded-full"
            ></span>
          </div>

          <div className="flex flex-col">
            <h4 className="font-semibold text-gray-800 dark:text-white text-base">
              {auth?.fullName}
            </h4>

            <p className="text-sm text-gray-500 dark:text-gray-300">
              @{auth?.username}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {auth?.role}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardUser;
