import React from "react";
import { AllSummary_API } from "../api/AllSummaryApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logout } from "../feature/authSlice";
import { toast } from "react-toastify";
import axios from "axios";

const UserLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios({
        url: AllSummary_API.logout.url,
        method: AllSummary_API.logout.method,
        withCredentials: true,
      });
      if (response.status == 200) {
        toast.success(response.data.message || "User Logout");
        dispatch(Logout());
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server error ");
    }
  };

  return handleLogout;
};

export default UserLogout;
