import axios from "axios";
import { useState } from "react";
import { AllSummary_API } from "../../api/AllSummaryApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateAutor = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [authorProfile, setAuthorProfile] = useState(null);
  const [inputValue, setInputValue] = useState({
    name: "",
    bio: "",
  });

  const handleProfileOnchange = (e) => {
    const file = e.target.files[0];
    setAuthorProfile(file);
    if (file) {
      const preViewUrl = URL.createObjectURL(file);
      setPreview(preViewUrl);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const handleAuthorFormInput = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", inputValue.name);
      formData.append("bio", inputValue.bio);
      if (authorProfile) {
        formData.append("authorProfile", authorProfile);
      }

      const response = await axios({
        url: AllSummary_API.createAuthor.url,
        method: AllSummary_API.createAuthor.method,
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success(response?.data?.message || "Author successfully Created");
        navigate("/");
        setInputValue({
          name: "",
          bio: "",
        });

        setAuthorProfile(" ");
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Server Error";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Become an Author
        </h2>

        <form onSubmit={handleAuthorFormInput}>
          <div className="mb-5 flex items-center justify-center">
            {preview ? (
              <img
                src={preview}
                alt="profile"
                className="w-16 h-16 object-cover rounded-full"
              />
            ) : (
              <label
                htmlFor="profile"
                className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center cursor-pointer text-white text-sm"
              >
                Upload
              </label>
            )}

            <input
              id="profile"
              type="file"
              className="hidden"
              name="authorProfile"
              onChange={handleProfileOnchange}
              
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={inputValue.name}
              onChange={handleOnChange}
              placeholder="Enter author name"
              className="w-full px-4 py-2 border rounded-lg
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              rows="4"
              placeholder="Enter author bio"
              name="bio"
              value={inputValue.bio}
              onChange={handleOnChange}
              className="w-full px-4 py-2 border rounded-lg resize-none
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <button
            className="w-full cursor-pointer bg-indigo-600 text-white py-2 rounded-lg font-semibold
      hover:bg-indigo-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAutor;
