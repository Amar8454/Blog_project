import axios from "axios";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Context } from "../../context/Context";

const AuthorUserProfile = () => {
  const { singleAuthor } = useSelector((state) => state.authors);
  const { getAuthorProfile } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getAuthorProfile(id);
    }
  }, [id]);

  return (
    <div className="max-w-md mx-auto">
      {singleAuthor && (
        <div className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 shadow-md rounded-2xl transition hover:shadow-lg">
          <div className="relative">
            <img
              src={singleAuthor?.authorProfile}
              alt="author"
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          </div>

          <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
              {singleAuthor?.name}
            </h4>

            <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
              {singleAuthor?.user?.role}
            </p>

            <p className="text-xs text-gray-600 mt-1 dark:text-gray-200">
              Content Creator ✍️
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorUserProfile;
