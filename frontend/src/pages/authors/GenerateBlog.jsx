import React, { useState } from "react";
import axios from "axios";
import { AllSummary_API } from "../../api/AllSummaryApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GenerateBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    description: "",
    category: "",
  });

  const navigate = useNavigate();
  //  image sections
  const [images, setImages] = useState([]);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // it handle only generate blog
  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      if (!formData.title) {
        setError("Please enter a title");
        return;
      }
      setLoading(true);
      setError("");

      const res = await axios({
        url: AllSummary_API.generateBlog.url,
        method: AllSummary_API.generateBlog.method,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: { title: formData.title },
      });

      setFormData({
        ...formData,
        content: res.data.content,
        title: res.data.title,
        description: res.data.description,
      });
    } catch (err) {
      setError("Failed to generate blog");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const submitFormData = new FormData();
      submitFormData.append("title", formData.title);
      submitFormData.append("content", formData.content);
      submitFormData.append("description", formData.description);
      submitFormData.append("category", formData.category);
      images.forEach((img) => {
        submitFormData.append("postImage", img);
      });

      const response = await axios({
        url: AllSummary_API.postData.url,
        method: AllSummary_API.postData.method,
        withCredentials: true,
        data: submitFormData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status == 200) {
        toast.success(response.data.message || "Post successfully created");
        navigate("/");
      }

      setFormData({
        title: "",
        description: "",
        content: "",
        category: "",
      });

      setImages([]);
    } catch (error) {
      console.log(error);
      const message = error?.response?.data?.message || "Internal Server Error";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex dark:bg-gray-800 dark:text-white items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl p-6 dark:bg-gray-900 dark:text-gray-50 rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold mb-2 text-center"> Generator Blog</h2>
        <form onSubmit={handleSubmitForm}>
          <input
            type="text"
            name="title"
            placeholder="Enter blog title..."
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg mb-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && <p className="text-red-500 mt-1">{error}</p>}

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Generated description will appear here..."
            rows={2}
            required
            className="w-full p-4 border rounded-lg mt-2 outline-none focus:ring-2 focus:ring-green-500"
          />

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Generated content will appear here..."
            rows={4}
            required
            className="w-full p-4 border rounded-lg mt-2 outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="mt-4 mb-3">
            <select
              value={formData.category}
              name="category"
              onChange={handleChange}
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

          <div className="mt-3 mb-3">
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Image Preview */}
          <div className="flex gap-2 flex-wrap mb-3">
            {images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-20 h-20 object-cover rounded-lg border"
              />
            ))}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-blue-600 text-white md:px-6 px-3 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              {loading ? "Generating..." : "Generate With AI"}
            </button>

            <button className="bg-blue-600 px-4 text-white md:px-6 py-2 rounded-lg hover:bg-blue-700 transition-all">
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateBlog;
