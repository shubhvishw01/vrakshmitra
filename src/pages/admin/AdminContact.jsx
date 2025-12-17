import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminContacts = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const gotoDashboard = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    fetch("https://vrakshmitrabackend.onrender.com/api/contact")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setContacts(data.contacts);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 mt-18 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Contact Messages
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

      {contacts.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No messages found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((c) => (
            <div
              key={c._id}
              className="bg-white shadow-lg rounded-2xl p-5 border border-green-200
                         hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-lg font-bold text-green-700 mb-2">
                {c.name}
              </h2>

              <p className="text-sm text-gray-600 mb-1">
                📧 <span className="font-medium">{c.email}</span>
              </p>

              {c.phone && (
                <p className="text-sm text-gray-600 mb-1">
                  📞 <span className="font-medium">{c.phone}</span>
                </p>
              )}

              <p className="text-gray-700 mt-3">{c.message}</p>

              <p className="text-xs text-gray-400 mt-4">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
