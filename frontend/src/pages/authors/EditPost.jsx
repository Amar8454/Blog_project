import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AllSummary_API } from "../../api/AllSummaryApi";
import { toast } from "react-toastify";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
  });

  // fetch single post
  const getSinglePost = async () => {
    const res = await axios({
      url: `${AllSummary_API.getSinglePost.url}/${id}`,
      method: AllSummary_API.getSinglePost.method,
      withCredentials: true,
    });

    setFormData({
      title: res.data.post.title,
      description: res.data.post.description,
      content: res.data.post.content,
      category: res.data.post.category,
    });
  };

  const handleOnChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitUpdateBtn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: `${AllSummary_API.updatePost.url}/${id}`,
        method: AllSummary_API.updatePost.method,
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/author_blogs");
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    }
  };

  useEffect(() => {
    if (id) getSinglePost(id);
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-white p-4">
      <h1 className="text-center px-2 py-2 text-2xl dark:text-gray-300 ">
        Edit Post
      </h1>
      <div
        className="bg-white w-full mx-auto max-w-xl p-6  dark:bg-gray-900
       dark:text-gray-50 rounded-xl shadow-md space-y-4"
      >
        <form action="" className="gap-4" onSubmit={handleSubmitUpdateBtn}>
          <div>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleOnChangeInput}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>

          <div className="mt-2">
            <label htmlFor="description">Desription:</label>
            <textarea
              name="description"
              value={formData.description}
              id="description"
              onChange={handleOnChangeInput}
              rows={2}
              className="w-full p-3 border rounded-lg focus:ring-2 transition focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          <div className="mt-2">
            <label htmlFor="content">Content:</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleOnChangeInput}
              id="content"
              rows={3}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          <div className="mt-2">
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleOnChangeInput}
              id="category"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white dark:bg-gray-900"
            >
              <option value="">Select Category</option>
              <option value="technology">Technology</option>
              <option value="education">Education</option>
              <option value="design">Design</option>
              <option value="bussiness">Business</option>
              <option value="full stack web development">
                Full Stack Web development
              </option>
              <option value="web development">Web Development</option>
              <option value="programming">Programming</option>
              <option value="Tutorials">Tutorials</option>
            </select>
          </div>

          <button className="w-full text-white px-4 py-3 font-semibold mt-4 bg-blue-800 hover:bg-blue-900 rounded-xl ">
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
