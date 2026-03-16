import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "../../context/Context";
import { FetchAuthorPost } from "../../feature/authorSlice";

const ShowFullProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { authorPost } = useSelector((state) => state.authors);
  const { getAuthorPost, getSingleAuthor, singleAuthor } = useContext(Context);

  useEffect(() => {
    if (id) {
      getAuthorPost(id);
      getSingleAuthor(id);
    }
    if (!authorPost) {
      dispatch(FetchAuthorPost());
    }
  }, [dispatch, id]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-white px-4 sm:px-6 lg:px-10">
      <main className="py-4 max-w-7xl mx-auto">
        <p className="text-xl text-gray-700 sm:text-2xl font-bold text-center mb-6 dark:text-gray-100">
          -: Author Details :-
        </p>

        <div className="flex justify-center">
          <div className="w-full sm:w-96 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
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
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Author</p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
                {singleAuthor?.bio}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Author Post  */}
      <main>
        <p className="text-xl sm:text-xl text-gray-700 font-semibold mb-1 dark:text-gray-100">
          Author Post :-
        </p>
        <div className="grid grid-cols-1 py-4 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {authorPost?.map((post, idx) => (
            <Link
              to={`/show_post/${post._id}`}
              key={idx}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-md"
            >
              <div className="relative">
                <img
                  src={post?.postImage[0]}
                  alt=""
                  className="w-full h-40 sm:h-44 object-cover rounded-t-2xl"
                />
                <span className="absolute top-2 left-2 text-white bg-blue-800 rounded-full px-2 py-1">
                  {post?.category}
                </span>
              </div>

              <div className="p-4">
                <p className="font-semibold text-base line-clamp-2">
                  {post?.title}
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={post?.author?.authorProfile}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-semibold">
                      {post?.author?.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {post?.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShowFullProfile;
