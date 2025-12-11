import { useState, useEffect } from "react";
import axios from "axios";

export default function PreviousEvents() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    date: "",
    place: "",
    desc: "",
  });

  const [file, setFile] = useState(null);

  const fetchEvents = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/previous");
    setEvents(res.data);
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
          `http://localhost:5000/api/admin/previous/update/${editingId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Event Updated!");
      } else {
        await axios.post(
          "http://localhost:5000/api/admin/previous/add",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Event Added!");
      }

      setOpen(false);
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/previous/delete/${id}`);
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
          Previous Events
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
              {event.image && (
                <img
                  src={`http://localhost:5000${event.image}`}
                  alt=""
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}

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

      {/* MODAL */}
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

              {/* IMAGE INPUT */}
              <input
                type="file"
                className="w-full p-2 border rounded"
                onChange={(e) => setFile(e.target.files[0])}
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
