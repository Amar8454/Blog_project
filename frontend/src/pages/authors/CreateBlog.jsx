import { useState } from "react";
import axios from "axios";
import { AllSummary_API } from "../../api/AllSummaryApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [postInput, setPostInput] = useState({
    title: "",
    description: "",
    category: "",
    content: "",
  });
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setPostInput((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handlePostSubmitBtn = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", postInput.title);
      formData.append("description", postInput.description);
      formData.append("category", postInput.category);
      formData.append("content", postInput.content);
      images.forEach((img) => {
        formData.append("postImage", img);
      });

      const response = await axios({
        url: AllSummary_API.postData.url,
        method: AllSummary_API.postData.method,
        withCredentials: true,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status == 200) {
        toast.success(response.data.message || "Post successfully created");
        navigate("/");
      }

      setPostInput({
        title: "",
        description: "",
        content: "",
        category: "",
      });

      setImages([]);
    } catch (error) {
      const message = error?.response?.data?.message || "Internal Server Error";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex dark:bg-gray-800 dark:text-white items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl p-6 dark:bg-gray-900 dark:text-gray-50 rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-center">Create Post</h2>

        <form onSubmit={handlePostSubmitBtn} className="space-y-4">
          <div>
            <input
              type="text"
              id="title"
              name="title"
              value={postInput.title}
              onChange={handleOnChange}
              placeholder="Post Title"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <textarea
              placeholder="Short Description"
              name="description"
              value={postInput.description}
              onChange={handleOnChange}
              rows={2}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <textarea
              placeholder="Post Content"
              name="content"
              value={postInput.content}
              onChange={handleOnChange}
              rows={3}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <select
              value={postInput.category}
              name="category"
              onChange={handleOnChange}
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

          <div>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Image Preview */}
          <div className="flex gap-2 flex-wrap">
            {images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-20 h-20 object-cover rounded-lg border"
              />
            ))}
          </div>

          <button className="w-full font-semibold bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            Save Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
