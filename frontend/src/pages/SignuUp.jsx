import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo2.jpeg";
import axios from "axios";
import { AllSummary_API } from "../api/AllSummaryApi";
import { toast } from "react-toastify";

function SignuUp() {
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [inputData, setInputData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setInputData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleProfileOnchange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      const preViewUrl = URL.createObjectURL(file);
      setPreview(preViewUrl);
    }
  };

  const handleInputSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fullName", inputData.fullName);
      formData.append("email", inputData.email);
      formData.append("password", inputData.password);
      formData.append("username", inputData.username);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await axios({
        url: AllSummary_API.signup.url,
        method: AllSummary_API.signup.method,
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message || "Signup successfully");
        setInputData({
          fullName: "",
          email: "",
          username: "",
          password: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      const message = error?.response?.data?.message || "Internal server error";
      toast.error(message);
    }
  };

  return (
    <div
      className="flex min-h-screen overflow-y-auto bg-gray-200 dark:bg-gray-800 dark:text-white
    flex-col lg:flex-row items-center justify-center lg:justify-evenly px-4 py-10"
    >
      {/* Left Section */}
      <div className="flex flex-col items-center gap-4 rounded-2xl lg:items-start mb-8 lg:mb-0 text-center lg:text-left dark:bg-gray-900 bg-white shadow">
        <img src={logo} alt="logoImage" className="w-full  h-40 rounded-2xl " />

        <h1 className="dark:text-gray-400 text-xl text-gray-700 max-w-sm px-4 py-2">
          This is a demo project. You can sign up with your email and password.
        </h1>
      </div>

      {/* Right Section - Form */}
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

        <form className="space-y-3" onSubmit={handleInputSubmitForm}>
          {/* Profile Upload */}
          <div className="flex items-center justify-center">
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
              onChange={handleProfileOnchange}
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm mb-1">UserName</label>
            <input
              className="p-2 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              type="text"
              name="username"
              autoComplete="username"
              value={inputData.username}
              onChange={handleOnChange}
              placeholder="Enter your Username"
              required
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              className="p-2 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              type="text"
              name="fullName"
              value={inputData.fullName}
              onChange={handleOnChange}
              placeholder="Enter your Full Name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              className="p-2 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              type="email"
              name="email"
              autoComplete="email"
              value={inputData.email}
              onChange={handleOnChange}
              placeholder="Enter your Email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              className="p-2 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              type="password"
              name="password"
              autoComplete="current-password"
              value={inputData.password}
              onChange={handleOnChange}
              placeholder="Enter your Password"
              required
            />
          </div>

          <button className="w-full py-3 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-800 transition cursor-pointer">
            Sign Up
          </button>
        </form>

        <p className="text-sm mt-4 text-right">
          Already have an account?
          <Link to="/login" className="text-blue-600 hover:underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
export default SignuUp;
