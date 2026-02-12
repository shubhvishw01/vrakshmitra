import { useState, useEffect } from "react";
import axios from "axios";

export default function PreviousEvents() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    date: "",
    place: "",
    desc: "",
  });

  const [file, setFile] = useState(null);

  const fetchEvents = async () => {
    const res = await axios.get(
      "https://vrakshmitrabackend.onrender.com/api/admin/previous",
    );
    setEvents(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openModalForAdd = () => {
    setEditingId(null);
    setForm({ date: "", place: "", desc: "" });
    setFile(null);
    setOpen(true);
  };

  const openModalForEdit = (event) => {
    setEditingId(event._id);
    setForm({
      place: event.place,
      date: event.date,
      desc: event.desc,
    });
    setFile(null);
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("place", form.place);
    formData.append("date", form.date);
    formData.append("desc", form.desc);
    if (file) formData.append("image", file);

    try {
      if (editingId) {
        await axios.put(
          `https://vrakshmitrabackend.onrender.com/api/admin/previous/update/${editingId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
      } else {
        await axios.post(
          "https://vrakshmitrabackend.onrender.com/api/admin/previous/add",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
      }

      setOpen(false);
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    await axios.delete(
      `https://vrakshmitrabackend.onrender.com/api/admin/previous/delete/${id}`,
    );
    fetchEvents();
  };

  return (
    <>
      <div>
        {/* 🔹 Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Previous Events</h1>

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
        {loading ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-red-500">Loading...</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition border flex flex-col overflow-hidden"
              >
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.place}
                    className="h-48 w-full object-cover"
                  />
                )}

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {event.place}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">📅 {event.date}</p>

                  <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                    {event.desc}
                  </p>

                  <div className="mt-auto pt-4 flex gap-2">
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

              <input
                type="file"
                className="w-full text-sm"
                onChange={(e) => setFile(e.target.files[0])}
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
