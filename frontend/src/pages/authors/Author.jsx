import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthorLogin } from "../../feature/authorSlice";

const Author = () => {
  const { authors } = useSelector((state) => state.authors);
  useEffect(() => {
    AuthorLogin();
  }, []);

  return (
    <div className="min-h-screen from-blue-50 py-4 to-indigo-100 px-4 sm:px-6 lg:px-10 flex flex-col bg-gray-100 dark:bg-gray-800 dark:text-white">
      <main className="flex-1 py-6 ">
        <h1 className="text-3xl font-bold  text-center mb-10 dark:text-gray-100">
          Our Authors
        </h1>
        <div className="grid grid-cols-1 md:px-20  sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {authors?.map((auth, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-900 rounded-2xl border shadow-lg 
                     min-h-50 p-6 hover:shadow-xl transition"
            >
              <div className=" gap-4 mt-6">
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={auth?.authorProfile}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </div>

                <div className=" text-center mt-2">
                  <h4 className="text-lg font-semibold">{auth?.name}</h4>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
              </div>
              <div className="mt-6 px-4 py-2 text-sm rounded-full bg-indigo-600 text-white w-full hover:bg-indigo-800 transition cursor-pointer text-center">
                <Link to={`/show_profile/${auth._id}`}> View Profile</Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Author;
