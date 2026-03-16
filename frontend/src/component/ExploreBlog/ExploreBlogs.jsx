import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="w-full min-h-75 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* Typewriter Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          <Typewriter
            options={{
              delay: 90, // typing speed
              deleteSpeed: 40,
            }}
            onInit={(typewriter) => {
              typewriter
                .pauseFor(2000) // 👈 2 sec delay before typing
                .typeString("Stay Ahead.")
                .deleteAll()
                .pauseFor(2000)
                .typeString("Read Blogs.")
                .deleteAll()
                .pauseFor(2000)
                .typeString("Learn and Explore.")
                .start();
            }}
          />
        </h1>

        {/* Description */}
        <p className="text-white text-base md:text-lg opacity-90 mb-6">
          Create blogs on technology, business, travel & modern trends
        </p>

        {/* Button */}
        <Link
          to="/blog"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full cursor-pointer hover:bg-blue-100 transition shadow-lg"
        >
          Explore Blogs
        </Link>
      </div>
    </div>
  );
};

export default Hero;
