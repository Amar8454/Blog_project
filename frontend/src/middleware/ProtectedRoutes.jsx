import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  //  Jab tak auth check complete nahi
  if (isLoading) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
      
      {/* Loader Circle */}
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>

      {/* Text */}
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        Checking Authentication...
      </h2>

      {/* Sub Text */}
      <p className="text-sm text-gray-500 mt-1">
        Please wait while we verify your session
      </p>

    </div>
  );
}

  //  Auth check complete ho gaya but user nahi
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  //  User verified
  return children;
};

export default ProtectedRoutes;
