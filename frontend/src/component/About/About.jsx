import React from "react";
import { FaRocket } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 dark:text-white dark:bg-gray-800 py-10">
      <div className="text-center px-4 sm:px-6 md:px-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-950 dark:text-white">
          About{" "}
          <span className="text-blue-900 dark:text-blue-600">DigitalBlogs</span>
        </h1>

        <div className="mt-3 max-w-3xl mx-auto">
          <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
            DigitalBlogs is a futuristic blogging platform where technology,
            creativity, and real-world experience come together to tell
            meaningful stories.
          </p>

          <p className="mt-2 text-gray-700 dark:text-gray-200 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
            We aim to inspire developers and creators by sharing practical
            knowledge, ideas, and modern web insights.
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-10 items-center py-9 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:px-20">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow">
            <p>
              <FaRocket className="text-blue-800 text-3xl mb-2" />{" "}
            </p>
            <h3 className="text-2xl font-bold">Our Mission</h3>
            <p className="text-md font-semibold mt-4 text-gray-700 dark:text-white">
              To empower developers by sharing and real coding journeys, deep
              technical insights, and practical solutions that actually work in
              productions.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow ">
            <p>
              <FaLightbulb className="text-blue-800 text-3xl mb-2" />{" "}
            </p>
            <h3 className="text-2xl font-bold">Our Vision</h3>
            <p className="text-md font-semibold mt-4 text-gray-700 dark:text-white">
              to become a trusted knowledge hub for modern web development,
              startups, Ai, and future-ready technologies across the globe.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow ">
            <p>
              <IoIosPeople className="text-blue-800 text-3xl mb-2" />{" "}
            </p>
            <h3 className="text-2xl font-bold">Our Community</h3>
            <p className="text-md font-semibold mt-4 text-gray-700 dark:text-white">
              digitalBlogs is built by developers, for developer. We believe in
              growing together through shared learning, collaboration, and
              honest experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
