import React from "react";

const AuthorSkeleton = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="sm:w-96 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 animate-pulse">
          <div className="flex justify-center">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          </div>

          <div className="text-center mt-4 space-y-3">
            <div className="h-4 w-32 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-20 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-48 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-40 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorSkeleton;
