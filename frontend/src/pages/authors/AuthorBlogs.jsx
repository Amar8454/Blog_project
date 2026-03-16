import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AllSummary_API } from "../../api/AllSummaryApi";

const AuthorBlogs = () => {
  const [authorPost, setAuthorPost] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Fetch Author Posts
  const getAuthorPost = async () => {
    try {
      const response = await axios({
        url: AllSummary_API.getAuthorPostLogin.url,
        method: AllSummary_API.getAuthorPostLogin.method,
        withCredentials: true,
      });

      setAuthorPost(response.data.authorPosts);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  //  Delete Post
  const handleDeleteBtn = async (id) => {
    try {
      const response = await axios({
        url: `${AllSummary_API.deletePost.url}/${id}`,
        method: AllSummary_API.deletePost.method,
        withCredentials: true,
      });
      getAuthorPost();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAuthorPost();
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-100 dark:bg-gray-800 dark:text-white px-4 sm:px-6 lg:px-10">
      <div className="grid grid-cols-1 py-4 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          //  Skeleton Loader
          Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden animate-pulse"
              >
                {/* Image Skeleton */}
                <div className="w-full h-44 bg-gray-300 dark:bg-gray-700"></div>

                {/* Title Skeleton */}
                <div className="px-4 mt-3 space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                </div>

                {/* Author Section Skeleton */}
                <div className="px-4 mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>

                {/* Button Skeleton */}
                <div className="flex justify-between px-4 py-4 gap-3">
                  <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-xl flex-1"></div>
                  <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-xl flex-1"></div>
                </div>
              </div>
            ))
        ) : authorPost?.length > 0 ? (
          authorPost.map((post) => (
            <div
              key={post._id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden flex flex-col min-w-0"
            >
              <Link to={`/show_post/${post._id}`} className="block">
                {/* Image Section */}
                <div className="relative w-full">
                  <img
                    src={post?.postImage?.[0] || "/placeholder.jpg"}
                    alt="post"
                    className="w-full h-44 object-cover"
                  />

                  <span
                    className="absolute top-3 left-3 
                           text-white bg-blue-800 
                           rounded-full px-3 py-1 
                           text-xs sm:text-sm
                           max-w-[85%] truncate capitalize"
                  >
                    {post?.category}
                  </span>
                </div>

                {/* Title */}
                <p className="font-semibold text-base line-clamp-2 px-4 mt-3 break-words">
                  {post?.title}
                </p>
              </Link>

              <div className="px-4 mt-4 flex items-center gap-3 min-w-0">
                <img
                  src={post?.author?.authorProfile || "/avatar.png"}
                  alt="author"
                  className="h-10 w-10 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold truncate">
                    {post?.author?.name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {post?.createdAt?.split("T")[0]}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center px-4 py-4 mt-auto gap-3">
                <Link
                  to={`/edit_post/${post._id}`}
                  className="flex-1 text-center bg-green-700 hover:bg-green-900 px-4 py-1 rounded-xl text-white"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDeleteBtn(post._id)}
                  className="flex-1 bg-red-700 hover:bg-red-900 px-4 py-1 rounded-xl text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No posts found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthorBlogs;
