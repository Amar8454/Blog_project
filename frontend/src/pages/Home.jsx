import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../feature/productSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const limitedBlogs = posts?.slice(0, 6);

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  return (
    <div className="flex-1 p-2 sm:p-6 lg:p-10">
      <h1 className="text-4xl text-gray-800 font-semibold py-4 md:py-2 mb-4 text-center dark:text-gray-300">
        Latest Blogs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden animate-pulse"
              >
                <div className="w-full h-40 sm:h-44 bg-gray-300 dark:bg-gray-700"></div>

                <div className="p-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>

                  <div className="flex items-center gap-3 mt-4">
                    <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>

                    <div className="flex-1">
                      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : limitedBlogs?.map((post) => (
              <Link
                to={`/show_post/${post._id}`}
                key={post._id}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl"
              >
                <div className="relative w-full">
                  <img
                    src={post?.postImage[0]}
                    alt=""
                    className="w-full h-40 sm:h-44 object-cover rounded-t-2xl"
                  />
                  <span className="absolute top-2 left-1 capitalize bg-blue-700 text-white rounded-full px-2 py-0.5">
                    {post?.category}
                  </span>
                </div>

                <div className="p-4">
                  <p className="font-semibold capitalize text-base line-clamp-2">
                    {post?.title}
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <img
                      src={post?.author?.authorProfile}
                      className="h-10 w-10 rounded-full object-cover"
                      alt=""
                    />
                    <div>
                      <h4 className="text-sm font-semibold">
                        {post?.author?.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {post?.updatedAt?.split("T")[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Home;
