import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { CheckCircle } from "lucide-react";

export default function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get(
        "https://vrakshmitrabackend.onrender.com/api/volunteers",
      );
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
    await axios.put(
      `https://vrakshmitrabackend.onrender.com/api/volunteers/${id}/approve`,
    );
    fetchVolunteers();
  };

  const removeVolunteer = async (id) => {
    if (!window.confirm("Are you sure you want to remove this volunteer?"))
      return;

    await axios.delete(
      `https://vrakshmitrabackend.onrender.com/api/volunteers/${id}`,
    );
    fetchVolunteers();
  };

  // 🔎 Filter Logic
  const filteredVolunteers = useMemo(() => {
    return volunteers.filter((v) =>
      `${v.name} ${v.email} ${v.city}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  }, [volunteers, searchTerm]);

  return (
    <div>
      {/* 🔹 Header + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className=" text-2xl font-bold text-gray-800">
          Volunteer Requests
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          Showing {filteredVolunteers.length} of {volunteers.length}
        </p>

        <input
          type="text"
          placeholder="Search by name, email, city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-72 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* 🔹 Content */}
      <div>
        {loading ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-red-500">Loading...</p>
          </div>
        ) : filteredVolunteers.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">No matching volunteers found.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVolunteers.map((v) => (
              <div
                key={v._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition flex flex-col overflow-hidden border"
              >
                <img
                  src={v.profileImage.replace(
                    "/upload/",
                    "/upload/f_auto,q_auto,w_400/",
                  )}
                  loading="lazy"
                  className="w-full h-48 object-cover"
                  alt={v.name}
                />

                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="font-semibold text-gray-800 truncate">
                    {v.name}
                  </h2>

                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p className="truncate">📧 {v.email}</p>
                    <p>📱 {v.mobile}</p>
                    <p className="truncate">🏙 {v.city}</p>
                  </div>

                  {v.reason && (
                    <p className="mt-3 text-sm text-gray-700 line-clamp-2">
                      “{v.reason}”
                    </p>
                  )}

                  <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                    {v.approved ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                        <CheckCircle size={16} /> Approved
                      </span>
                    ) : (
                      <button
                        onClick={() => approveVolunteer(v._id)}
                        className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                      >
                        Approve
                      </button>
                    )}

                    <button
                      onClick={() => removeVolunteer(v._id)}
                      className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
