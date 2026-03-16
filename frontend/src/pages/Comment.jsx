import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AllSummary_API } from "../api/AllSummaryApi";
import { MdDelete } from "react-icons/md";

const Comment = () => {
  const [getComments, setGetComment] = useState([]);
  const [comment, setComment] = useState("");
  const { id } = useParams();

  const addComment = async () => {
    try {
      const res = await axios({
        url: `${AllSummary_API.commentPost.url}/${id}`,
        method: AllSummary_API.commentPost.method,
        withCredentials: true,
        data: { comment },
        headers: {
          "Content-Type": "application/json",
        },
      });
      setComment("");
      getComment();
    } catch (error) {
      error?.res?.data?.message || "Internal server Error";
    }
  };

  const getComment = async () => {
    try {
      const response = await axios({
        url: `${AllSummary_API.getComment.url}/${id}`,
        method: AllSummary_API.getComment.method,
        withCredentials: true,
      });
      setGetComment(response.data.comments);
    } catch (error) {
      error?.response?.data?.message || "Error fetching comment";
    }
  };

  const deleteComment = async (id) => {
    try {
      const response = await axios({
        url: `${AllSummary_API.deleteComment.url}/${id}`,
        method: AllSummary_API.deleteComment.method,
        withCredentials: true,
      });
      getComment();
    } catch (error) {
      error?.response?.data?.message || "Internal server Error";
    }
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Comments:-
      </h2>

      <div className="w-full max-w-2xl mx-auto space-y-5 px-4">
        {getComments?.map((cmt, idx) => (
          <div
            key={idx}
            className="relative bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-5 transition hover:shadow-xl"
          >
            <button className="absolute top-3 right-3 text-xs  text-white rounded-full">
              <MdDelete
                className="text-xl text-red-600 hover:text-red-700 transition"
                onClick={() => deleteComment(cmt._id)}
              />
            </button>

            <div className="flex gap-4">
              <div className="w-11 h-11 min-w-[44px] rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                {cmt?.user?.profileImage ? (
                  <img
                    src={cmt?.user?.profileImage}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  cmt?.user?.username?.charAt(0).toUpperCase() || "U"
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-200">
                    {cmt?.user?.username || "Anonymous"}
                  </h4>

                  <span className="text-xs text-gray-400 mt-1">
                    {cmt?.createdAt?.split("T")[0]}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-xl leading-relaxed">
                  {cmt?.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment */}
      <div className="w-full max-w-2xl mx-auto px-4 mt-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Write a comment..."
            className="flex-1 px-2 py-2 rounded-xl border border-gray-300 
        focus:outline-none focus:ring-2 focus:ring-blue-500
        dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />

          <button
            onClick={addComment}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 
        text-white rounded-xl hover:scale-105 active:scale-95 
        transition duration-200 font-semibold shadow-md"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
