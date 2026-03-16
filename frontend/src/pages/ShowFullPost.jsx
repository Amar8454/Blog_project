import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AllSummary_API } from "../api/AllSummaryApi";
import Comment from "./Comment";

const ShowFullPost = () => {
  const [singlePost, setSinglePost] = useState("");
  const { id } = useParams();

  const getSinglePost = async () => {
    try {
      const res = await axios({
        url: `${AllSummary_API.getSinglePost.url}/${id}`,
        method: AllSummary_API.getSinglePost.method,
        withCredentials: true,
      });
      setSinglePost(res?.data?.post);
    } catch (error) {
      error?.res?.data?.message || "Error fetching post";
    }
  };

  useEffect(() => {
    getSinglePost();
  }, [id]);

  const content = singlePost?.content || "";
  const images = singlePost?.postImage || [];

  const words = content.split(" ");
  const partSize = Math.ceil(words.length / images.length);

  const contentParts = [];

  for (let i = 0; i < images.length; i++) {
    const start = i * partSize;
    const end = start + partSize;
    contentParts.push(words.slice(start, end).join(" "));
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {singlePost?.postImage?.length > 0 && (
          <img
            src={singlePost?.postImage[2]}
            alt="post"
            className="w-full 
                   h-56 sm:h-72 md:h-[400px] lg:h-[450px]
                   object-cover 
                   rounded-2xl 
                   shadow-md"
          />
        )}

        <div className="mt-4">
          <span className="bg-blue-700 text-white px-4 py-1 rounded-full text-xs sm:text-sm">
            {singlePost?.category}
          </span>
        </div>

        <h1
          className="mt-4 font-semibold 
                   text-lg sm:text-xl md:text-2xl lg:text-3xl"
        >
          {singlePost?.description}
        </h1>

        <div
          className="flex items-center gap-3 mt-6 
                    bg-white dark:bg-gray-800 
                    p-4 rounded-2xl shadow-sm w-full sm:w-fit"
        >
          <img
            src={singlePost?.author?.authorProfile || "U"}
            alt="author"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />

          <div>
            <p className="text-sm sm:text-base font-medium">
              {singlePost?.author?.name}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {singlePost?.createdAt?.split("T")[0]}
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-10">
          {images.map((img, idx) => (
            <div key={idx} className="space-y-4">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                {contentParts[idx]}
              </p>

              <img
                src={img || "U"}
                alt="post"
                className="w-full 
                       h-56 sm:h-72 md:h-96
                       object-cover 
                       rounded-2xl 
                       shadow-md"
              />
            </div>
          ))}
        </div>


        <div>
          <h4 className="text-xl font-semibold dark:text-gray-300 p-6">
            <Comment />
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ShowFullPost;
