import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, History, LogOut } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/adminlogin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 p-6 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-10 mt-10 border border-white/40">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-extrabold text-green-800 tracking-wide">
            🌿 Admin Panel
          </h1>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white py-2 px-5 
                       rounded-xl shadow-md hover:bg-red-600 hover:shadow-lg 
                       transition-all duration-200 active:scale-95"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          {/* Upcoming Events */}
          <Link
            to="/admin/upcoming"
            className="group p-8 rounded-2xl shadow-lg bg-white border border-green-200 
                       hover:border-green-400 hover:shadow-2xl hover:bg-green-50 
                       transition-all duration-300 flex flex-col items-center"
          >
            <CalendarDays
              size={50}
              className="text-green-700 group-hover:scale-110 transition"
            />
            <h2 className="text-2xl font-semibold text-green-900 mt-4">
              Upcoming Events
            </h2>
          </Link>

          {/* Previous Events */}
          <Link
            to="/admin/previous"
            className="group p-8 rounded-2xl shadow-lg bg-white border border-blue-200 
                       hover:border-blue-400 hover:shadow-2xl hover:bg-blue-50 
                       transition-all duration-300 flex flex-col items-center"
          >
            <History
              size={50}
              className="text-blue-700 group-hover:scale-110 transition"
            />
            <h2 className="text-2xl font-semibold text-blue-900 mt-4">
              Previous Events
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
