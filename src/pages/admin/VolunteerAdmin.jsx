import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminVolunteers() {
  const navigate = useNavigate();
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  const gotoDashboard = () => {
    navigate("/dashboard");
  };

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/volunteers");
      setVolunteers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const approveVolunteer = async (id) => {
    await axios.put(`http://localhost:5000/api/volunteers/${id}/approve`);
    fetchVolunteers();
  };

  const removeVolunteer = async (id) => {
    if (!window.confirm("Are you sure you want to remove this volunteer?"))
      return;
    await axios.delete(`http://localhost:5000/api/volunteers/${id}`);
    fetchVolunteers();
  };

  if (loading) {
    return <div className="p-8 text-center">Loading volunteers...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 mt-20">
      {/* 🔹 TOP HEADER */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-800">
          Volunteer Requests
        </h1>

        <button
          onClick={gotoDashboard}
          className="
        px-5 py-2 rounded-xl
        bg-yellow-400 text-white font-semibold
        hover:bg-green-700 transition
      "
        >
          ← Dashboard
        </button>
      </div>

      {/* 🔹 VOLUNTEERS GRID */}
      <div className="max-w-6xl mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {volunteers.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No volunteer applications found.
          </p>
        ) : (
          volunteers.map((v) => (
            <div
              key={v._id}
              className="
            bg-white rounded-xl shadow
            hover:shadow-md transition
            overflow-hidden flex flex-col
          "
            >
              {/* IMAGE */}
              <img
                src={v.profileImage}
                alt={v.name}
                className="h-36 w-full object-cover"
              />

              {/* CONTENT */}
              <div className="p-3 flex-1">
                <h2 className="text-sm font-semibold text-green-800 truncate">
                  {v.name}
                </h2>

                <div className="mt-1 space-y-0.5 text-xs text-gray-600">
                  <p className="truncate">📧 {v.email}</p>
                  <p>📱 {v.mobile}</p>
                  <p className="truncate">🏙 {v.city}</p>
                </div>

                {v.reason && (
                  <p className="mt-2 text-xs text-gray-700 line-clamp-2">
                    “{v.reason}”
                  </p>
                )}
              </div>

              {/* ACTIONS */}
              <div className="px-3 pb-3 flex items-center justify-between gap-2">
                {v.approved ? (
                  <span className="text-green-600 font-semibold flex items-center gap-1 text-xs">
                    <CheckCircle size={14} /> Approved
                  </span>
                ) : (
                  <button
                    onClick={() => approveVolunteer(v._id)}
                    className="
                  px-3 py-1.5 rounded-md
                  bg-green-600 text-white
                  text-xs font-semibold
                  hover:bg-green-700 transition
                "
                  >
                    Approve
                  </button>
                )}

                <button
                  onClick={() => removeVolunteer(v._id)}
                  className="
                px-3 py-1.5 rounded-md
                bg-red-600 text-white
                text-xs hover:bg-red-700 transition
              "
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
