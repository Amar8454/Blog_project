import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white shadow dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 ">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              About Our Blog
            </h2>
            <p className="text-sm leading-relaxed">
              This blog platform is created to share knowledge, ideas, and
              experiences. Read quality articles, write your own blogs, and
              explore technology & creativity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Quick Links
            </h2>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-500 transition">
                <Link to="">Home</Link>
              </li>
              <li className="hover:text-blue-500 transition">
                <Link to="blog">Blogs</Link>
              </li>
              <li className="hover:text-blue-500 transition">
                <Link to="about">About Project</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Contact
            </h2>
            <ul className="space-y-2 text-sm">
              <li>Email: amarjitkumarmgh12004@gmail.com</li>
              <li>Phone: +91 9031581312</li>
              <li>Location: India</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-4 text-center text-xs sm:text-sm">
          © {new Date().getFullYear()} My Blog Project. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
