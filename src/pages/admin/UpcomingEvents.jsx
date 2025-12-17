import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpcomingEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ date: "", place: "", desc: "" });

  const gotoDashboard = () => {
    navigate("/dashboard");
  };

  const fetchEvents = async () => {
    const res = await axios.get(
      "https://vrakshmitrabackend.onrender.com/api/admin/upcoming"
    );
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openModalForAdd = () => {
    setEditingId(null);
    setForm({ date: "", place: "", desc: "" });
    setOpen(true);
  };

  const openModalForEdit = (event) => {
    setEditingId(event._id);
    setForm({ place: event.place, date: event.date, desc: event.desc });
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `https://vrakshmitrabackend.onrender.com/api/admin/upcoming/update/${editingId}`,
          form
        );
        alert("Event Updated!");
      } else {
        await axios.post(
          "https://vrakshmitrabackend.onrender.com/api/admin/upcoming/add",
          form
        );
        alert("Event Added!");
      }
      setOpen(false);
      setForm({ date: "", place: "", desc: "" });
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `https://vrakshmitrabackend.onrender.com/api/admin/upcoming/delete/${id}`
    );
    alert("Event Deleted!");
    fetchEvents();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 mt-20 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-3xl font-bold text-green-700">
              Upcoming Events
            </h2>

            <div className="flex gap-3">
              <button
                onClick={openModalForAdd}
                className="px-5 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
              >
                + Add Event
              </button>

              <button
                onClick={gotoDashboard}
                className="px-5 py-2 rounded-xl bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition"
              >
                ← Dashboard
              </button>
            </div>
          </div>

          {/* EVENTS GRID */}
          {events.length === 0 ? (
            <p className="text-gray-500 text-center">No events found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 flex flex-col"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-green-800">
                      {event.place}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      📅 {event.date}
                    </p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {event.desc}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => openModalForEdit(event)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-96 p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Event" : "Add Event"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                placeholder="Place"
                className="w-full p-3 border rounded-lg"
                value={form.place}
                onChange={(e) => setForm({ ...form, place: e.target.value })}
              />
              <input
                type="date"
                className="w-full p-3 border rounded-lg"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              <textarea
                placeholder="Description"
                className="w-full p-3 border rounded-lg"
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  {editingId ? "Update Event" : "Add Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
