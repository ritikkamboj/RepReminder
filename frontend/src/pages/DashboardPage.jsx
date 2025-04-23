import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const user =JSON.parse( localStorage.getItem("user"));
    console.log(user.token);
    if (!user) {
        console.log('token toh hona chahiye bhai ')
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow"
      >
        🚪 Logout
      </button>

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        💪 Welcome to RepReminder Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
        <Link
          to="/active"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-6 px-4 rounded-2xl shadow-md text-center transition"
        >
          🟢 Active Subscriptions
        </Link>

        <Link
          to="/expiring"
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-6 px-4 rounded-2xl shadow-md text-center transition"
        >
          ⏳ Expiring in 5 Days
        </Link>

        <Link
          to="/expired"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-6 px-4 rounded-2xl shadow-md text-center transition"
        >
          ❌ Expired Subscriptions
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;

