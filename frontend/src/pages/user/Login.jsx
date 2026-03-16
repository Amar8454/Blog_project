import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AllSummary_API } from "../../api/AllSummaryApi";
import { toast } from "react-toastify";
import logo from "../../assets/logo2.jpeg";
import { Context } from "../../context/Context";

function Login() {
  const { getUserDetails } = useContext(Context);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setInputData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleSubmitInputData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        url: AllSummary_API.login.url,
        method: AllSummary_API.login.method,
        data: inputData,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message || "Login successfully");
        navigate("/");
        getUserDetails();
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Invalid email or password";
      toast.error(message);
    }

    setInputData({ email: "", password: "" });
  };

  useEffect(() => {
    getUserDetails();
  });
  return (
    <div
      className="flex h-screen bg-gray-200 dark:bg-gray-800 dark:text-white
    flex-col lg:flex-row items-center justify-center lg:justify-evenly px-4 py-10"
    >
      <div className="flex flex-col items-center gap-4 rounded-2xl lg:items-start mb-8 lg:mb-0 text-center lg:text-left dark:bg-gray-900 bg-white shadow">
        <img src={logo} alt="logoImage" className="w-full h-40  rounded-2xl" />

        <p className="dark:text-gray-300 text-xl text-gray-700 max-w-sm px-4 py-2">
          This is a demo project. You can sign up with your email and password.
        </p>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8">
        <form className="space-y-4" onSubmit={handleSubmitInputData}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              className="p-2 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              type="text"
              id="email"
              name="email"
              value={inputData.email}
              placeholder="Enter your Email"
              onChange={handleOnChangeInput}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <input
              className="p-2 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              type="password"
              name="password"
              value={inputData.password}
              id="password"
              placeholder="Enter your Password"
              onChange={handleOnChangeInput}
              required
            />
          </div>

          {/* Button */}
          <button className="w-full py-3 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-800 transition duration-300 cursor-pointer">
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-4">
          Don't have an account?
          <Link
            to="/signup"
            className="text-blue-600 ml-1 hover:underline font-medium"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
