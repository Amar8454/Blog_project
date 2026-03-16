import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const auth = useSelector((state) => state.auth?.user);

  if (!auth) return <p>Loading ...</p>;
  return (
    <div className="px-4 py-6 flex justify-center">
      {auth && (
        <div
          className="w-full max-w-sm bg-white dark:bg-gray-900 
                    shadow-lg hover:shadow-2xl 
                    transition duration-300 
                    rounded-3xl p-6 text-center"
        >
          <div className=" w-28 h-28 mx-auto overflow-hidden">
            <img
              src={auth?.profileImage}
              alt="user"
              className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500"
            />
          </div>

          <h2 className="font-bold text-2xl mt-4 text-gray-800 dark:text-white">
            {auth?.fullName}
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {auth?.email}
          </p>

          <p className="mt-2 text-indigo-600 dark:text-indigo-400 font-medium">
            @{auth?.username}
          </p>

          <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-4"></div>

          <div className="mb-4">
            <span
              className="px-4 py-1 text-xs font-semibold rounded-full 
                         bg-indigo-100 text-indigo-600 
                         dark:bg-indigo-800 dark:text-indigo-200"
            >
              {auth?.role?.toUpperCase()}
            </span>
          </div>

          {auth?.role === "user" && (
            <Link
              to="/create_author"
              className="block w-full py-2 rounded-full 
                     bg-blue-600 hover:bg-blue-700 
                     transition duration-300 
                     text-white font-medium shadow-md hover:scale-105"
            >
              Become an Author
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
