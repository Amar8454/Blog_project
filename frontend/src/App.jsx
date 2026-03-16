import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Router } from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.getItem("theme", "light");
    }
  }, [darkTheme]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
