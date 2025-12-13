import { useState, useEffect } from "react";
import axios from "axios";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ date: "", place: "", desc: "" });

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
      {/* ADD BUTTON */}
      <div className="max-w-3xl mx-auto p-10">
        <div className="max-w-3xl mt-10 flex justify-end">
          <button
            onClick={openModalForAdd}
            className="bg-green-600 text-white px-6 py-2 rounded shadow"
          >
            + Add Event
          </button>
        </div>

        {/* EVENTS LIST */}
        <h2 className="text-3xl font-bold mb-6 text-green-700">
          Upcoming Events
        </h2>
        <div className="space-y-4">
          {events.length === 0 && (
            <p className="text-gray-500 text-center">No events found.</p>
          )}

          {events.map((event) => (
            <div
              key={event._id}
              className="p-5 border rounded-xl shadow-md bg-white"
            >
              <h3 className="text-xl font-bold">{event.place}</h3>
              <p className="text-gray-700">{event.date}</p>
              <p className="text-gray-600 mt-2">{event.desc}</p>

              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => openModalForEdit(event)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SIMPLE MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Event" : "Add Event"}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                placeholder="Place"
                className="w-full p-3 border rounded"
                value={form.place}
                onChange={(e) => setForm({ ...form, place: e.target.value })}
              />
              <input
                placeholder="Date"
                type="date"
                className="w-full p-3 border rounded"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              <textarea
                placeholder="Description"
                className="w-full p-3 border rounded"
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
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
