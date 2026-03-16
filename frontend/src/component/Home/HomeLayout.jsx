import React from "react";
import ExploreBlogs from "../ExploreBlog/ExploreBlogs";
import Home from "../../pages/Home";

const HomeLayout = () => {
  return (
    <div
      className="min-h-screen flex flex-col
     bg-gray-100 dark:bg-gray-800
      dark:text-white"
    >
      <ExploreBlogs />
      <Home />
    </div>
  );
};
export default HomeLayout;
