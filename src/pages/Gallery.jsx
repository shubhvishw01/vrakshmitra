import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../redux/eventsSlice";
import EventCard from "./EventCard";

export default function Gallery() {
  const [selectedType, setSelectedType] = useState("upcoming");

  const dispatch = useDispatch();

  const { past, upcoming, loading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const events = selectedType === "past" ? past : upcoming;

  return (
    <section className="max-w-5xl mx-auto text-center mt-20 py-16 px-4">
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        वृक्षारोपण कार्यक्रम 🌳
      </h1>

      {/* Radio Buttons */}
      <div className="flex justify-center gap-8 mb-10">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="type"
            value="past"
            checked={selectedType === "past"}
            onChange={() => setSelectedType("past")}
            className="accent-green-700"
          />
          <span className="text-gray-700 font-medium">पिछला</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="type"
            value="upcoming"
            checked={selectedType === "upcoming"}
            onChange={() => setSelectedType("upcoming")}
            className="accent-green-700"
          />
          <span className="text-gray-700 font-medium">आगामी</span>
        </label>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* No Events Case */}
          {events.length === 0 ? (
            <p className="text-gray-600 text-lg">कोई डेटा उपलब्ध नहीं है</p>
          ) : (
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
              {events.map((event, i) => (
                <EventCard key={i} {...event} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
