import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchSingleAuthor } from "../../feature/authorSlice";
import AuthorSkeleton from "../../component/SkeletonLoader/AuthorSkeleton";

const AuthorProfile = () => {
  const { id } = useParams();
  const { singleAuthor, isLoading } = useSelector((state) => state.authors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!singleAuthor) {
      dispatch(FetchSingleAuthor(id));
    }
  }, [dispatch, id]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-white px-4 sm:px-6 lg:px-10">
      <main className="py-10 max-w-7xl mx-auto">
        <h1 className="text-xl text-gray-700 sm:text-4xl font-bold text-center mb-6 dark:text-gray-100">
          Author Details
        </h1>

        {isLoading ? (
          <AuthorSkeleton />
        ) : (
          <div className="flex justify-center">
            <div className=" sm:w-96 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4">
              <div className="flex justify-center">
                <img
                  src={singleAuthor?.authorProfile}
                  alt="Author"
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border"
                />
              </div>

              <div className="text-center mt-4">
                <h4 className="text-lg sm:text-xl font-semibold">
                  {singleAuthor?.name}
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 mt-1 capitalize">
                  author
                </p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
                  {singleAuthor?.bio}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AuthorProfile;
