import { useState, useEffect } from "react";
import axios from "axios";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ date: "", place: "", desc: "" });

  const fetchEvents = async () => {
    const res = await axios.get(
      "https://vrakshmitrabackend.onrender.com/api/admin/upcoming",
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
    setForm({
      place: event.place,
      date: event.date,
      desc: event.desc,
    });
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `https://vrakshmitrabackend.onrender.com/api/admin/upcoming/update/${editingId}`,
          form,
        );
      } else {
        await axios.post(
          "https://vrakshmitrabackend.onrender.com/api/admin/upcoming/add",
          form,
        );
      }

      setOpen(false);
      setForm({ date: "", place: "", desc: "" });
      fetchEvents();
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    await axios.delete(
      `https://vrakshmitrabackend.onrender.com/api/admin/upcoming/delete/${id}`,
    );
    fetchEvents();
  };

  return (
    <>
      <div>
        {/* 🔹 Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Upcoming Events</h1>

          <button
            onClick={openModalForAdd}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
          >
            + Add Event
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Total Events: {events.length}
        </p>

        {/* 🔹 Grid */}
        {events.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">No upcoming events found.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition border flex flex-col p-5"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {event.place}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">📅 {event.date}</p>

                  <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                    {event.desc}
                  </p>
                </div>

                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => openModalForEdit(event)}
                    className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="flex-1 bg-red-500 text-white text-sm py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔹 Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {editingId ? "Edit Event" : "Add Event"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                placeholder="Place"
                required
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={form.place}
                onChange={(e) => setForm({ ...form, place: e.target.value })}
              />

              <input
                type="date"
                required
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />

              <textarea
                placeholder="Description"
                required
                rows="3"
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
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
