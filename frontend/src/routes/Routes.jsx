import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/user/Login";
import SignuUp from "../pages/SignuUp";
import DashboardUser from "../pages/user/DashboardUser";
import HomeLayout from "../component/Home/HomeLayout";
import Layout from "../layout/Layout";
import Blog from "../component/Blogs/Blog";
import Author from "../pages/authors/Author";
import About from "../component/About/About";
import CreateBlog from "../pages/authors/CreateBlog";
import GenerateBlog from "../pages/authors/GenerateBlog";
import MyProfile from "../pages/user/MyProfile";
import DashboardHome from "../pages/user/DashboardHome";
import ShowFullPost from "../pages/ShowFullPost";
import Home from "../pages/Home";
import ProtectedRoutes from "../middleware/ProtectedRoutes";
import ShowFullProfile from "../pages/authors/ShowFullProfile";
import CreateAutor from "../pages/authors/CreateAutor";
import DashboardAuthor from "../pages/authors/DashboardAuthor";
import AuthorDashboardHome from "../pages/authors/AuthorDashboardHome";
import AuthorProfile from "../pages/authors/AuthorProfile";
import AuthorBlogs from "../pages/authors/AuthorBlogs";
import EditPost from "../pages/authors/EditPost";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "/",
        element: <HomeLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
      {
        path: "show_post/:id",
        element: (
          <ProtectedRoutes>
            <ShowFullPost />
          </ProtectedRoutes>
        ),
      },
      {
        path: "blog",
        element: <Blog />,
      },

      {
        path: "author",
        element: <Author />,
      },

      {
        path: "show_profile/:id",
        element: (
          <ProtectedRoutes>
            <ShowFullProfile />
          </ProtectedRoutes>
        ),
      },

      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignuUp />,
      },

      // user dashboard
      {
        path: "/",
        element: <DashboardUser />,
        children: [
          {
            path: "user/dashboard_home",
            element: <DashboardHome />,
          },
          {
            path: "my_profile",
            element: <MyProfile />,
          },

          {
            path: "/create_author",
            element: <CreateAutor />,
          },
        ],
      },

      // author dashboard
      {
        path: "/",
        element: <DashboardAuthor />,
        children: [
          {
            path: "author/dashboard_home",
            element: <AuthorDashboardHome />,
          },
          {
            path: "author_blogs",
            element: <AuthorBlogs />,
          },
          {
            path: "create_blog",
            element: <CreateBlog />,
          },
          {
            path: "generate_blog",
            element: <GenerateBlog />,
          },
          {
            path: "author_profile",
            element: <AuthorProfile />,
          },

          {
            path: "edit_post/:id",
            element: <EditPost />,
          },
        ],
      },
    ],
  },
]);
