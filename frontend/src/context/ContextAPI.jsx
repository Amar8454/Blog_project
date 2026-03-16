import { useEffect, useState } from "react";
import axios from "axios";
import { Context } from "./Context";
import { AuthCompleted, LoginSuccess } from "../feature/authSlice";
import { AllSummary_API } from "../api/AllSummaryApi";
import { useDispatch } from "react-redux";
import {
  AuthorFail,
  AuthorLogin,
  AuthorRequest,
  FetchAuthorPost,
  FetchSingleAuthor,
} from "../feature/authorSlice";

const ContextProvider = ({ children }) => {
  const [singleAuthor, setSingleAuthor] = useState(null);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();

  // get All Author
  const getAuthor = async () => {
    try {
      const res = await axios({
        url: AllSummary_API.getAllAuthor.url,
        method: AllSummary_API.getAllAuthor.method,
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(AuthorLogin(res?.data?.authors));
      }
    } catch (error) {
      console.log("Internal Server Error ?", error.message);
    }
  };

  // get Author Post by id
  const getAuthorPost = async (id) => {
    if (!id) return;
    try {
      const response = await axios({
        url: `${AllSummary_API.getAuthorPost.url}/${id}`,
        method: AllSummary_API.getAuthorPost.method,
        withCredentials: true,
      });
      dispatch(FetchAuthorPost(response?.data?.data));
    } catch (error) {
      console.log("Internal Server Error ?", error.message);
    }
  };

  // get single Author Profile
  const getAuthorProfile = async (id) => {
    if (!id) return;
    try {
      dispatch(AuthorRequest());
      const res = await axios({
        url: `${AllSummary_API.getAuthorProfile.url}/${id}`,
        method: AllSummary_API.getAuthorProfile.method,
        withCredentials: true,
      });
      dispatch(FetchSingleAuthor(res?.data?.authorData));
    } catch (error) {
      dispatch(AuthorFail(error.message));
    }
  };

  // get normal user details
  const getUserDetails = async () => {
    try {
      const response = await axios({
        url: AllSummary_API.getUserProfile.url,
        method: AllSummary_API.getUserProfile.method,
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(LoginSuccess(response?.data?.user));
        setUserId(response?.data?.user?._id);
      }
    } catch (error) {
      console.log("Internal Server Error ?", error.message);
    }
  };

  //  get single author by id
  const getSingleAuthor = async (id) => {
    if (!id) return;
    try {
      const res = await axios({
        url: `${AllSummary_API.getSingleAuthor.url}/${id}`,
        method: AllSummary_API.getSingleAuthor.method,
        withCredentials: true,
      });
      setSingleAuthor(res.data.author);
    } catch (error) {
      console.log("Internal Server Error ?", error.message);
    }
  };

  // first load
  useEffect(() => {
    getUserDetails();
    getAuthor();
  }, []);

  // after user loaded
  useEffect(() => {
    if (!userId) return;
    getAuthorPost(userId);
    getSingleAuthor(userId);
    getAuthorProfile(userId);
  }, [userId]);

  return (
    <Context.Provider
      value={{
        getAuthorPost,
        getUserDetails,
        getSingleAuthor,
        singleAuthor,
        getAuthor,
        getAuthorProfile,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
