import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo2.jpeg";
import { MdLightMode, MdOutlineLightMode } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../feature/themeSlice";
import UserIcons from "../UserIcon/UserIcons";
import { LoginSuccess } from "../../feature/authSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.user);
  const darkTheme = useSelector((state) => state.theme.darkTheme);

  return (
    <nav className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="logo"
            className="h-10 w-20 object-cover rounded-xl"
          />
          <span className="text-xl font-semibold">Blog</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="blog">
            <li>Blog</li>
          </Link>
          <Link to="author">
            <li>Authors</li>
          </Link>
          <Link to="about">
            <li>About</li>
          </Link>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Dark mode */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="text-2xl cursor-pointer"
          >
            {darkTheme ? <MdLightMode /> : <MdOutlineLightMode />}
          </button>

          {/* Desktop Buttons */}

          <div className="hidden md:flex gap-3">
            {auth ? (
              <UserIcons />
            ) : (
              <>
                <Link to="login">
                  <button className="px-4 py-1 rounded-full border hover:bg-blue-500 hover:text-white transition">
                    Login
                  </button>
                </Link>

                <Link to="signup">
                  <button className="px-4 py-1 rounded-full border hover:bg-blue-500 hover:text-white transition">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700">
          <ul className="flex flex-col items-start px-10 gap-4 py-6 font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="blog" onClick={() => setMenuOpen(false)}>
              Blog
            </Link>
            <Link to="author" onClick={() => setMenuOpen(false)}>
              Authors
            </Link>
            <Link to="about" onClick={() => setMenuOpen(false)}>
              About
            </Link>

            {auth ? (
              <div>
                <UserIcons
                  className="px-8"
                  onClick={() => setMenuOpen(false)}
                />
              </div>
            ) : (
              <>
                <Link to="login" onClick={() => setMenuOpen(false)}>
                  <button
                    className="w-24 py-1 border rounded-full"
                    onClick={() => dispatch(LoginSuccess)}
                  >
                    Login
                  </button>
                </Link>
                <Link to="signup" onClick={() => setMenuOpen(false)}>
                  <button className="w-24 py-1 border rounded-full">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
