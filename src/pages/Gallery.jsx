import { useState } from "react";

const EventCard = ({ image, title, date, location }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 text-left">
        <h3 className="text-lg font-semibold text-green-700">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">📅 {date}</p>
        <p className="text-sm text-gray-600">📍 {location}</p>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [selectedType, setSelectedType] = useState("upcoming");

  const pastEvents = [
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      title: "हरित पृथ्वी अभियान",
      date: "10 सितम्बर 2025",
      location: "नागपुर, महाराष्ट्र",
    },
    {
      image: "https://images.unsplash.com/photo-1594737625785-ccebb47f34be",
      title: "ग्रीन भोपाल मिशन",
      date: "28 अगस्त 2025",
      location: "भोपाल, मध्यप्रदेश",
    },
  ];

  const upcomingEvents = [
    {
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
      title: "हर घर पेड़ अभियान",
      date: "10 नवम्बर 2025",
      location: "पुणे, महाराष्ट्र",
    },
    {
      image: "https://images.unsplash.com/photo-1495395226200-8fbf6b97a79d",
      title: "नर्मदा वृक्षारोपण",
      date: "15 नवम्बर 2025",
      location: "इंदौर, मध्यप्रदेश",
    },
    {
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      title: "हरित भोपाल मिशन",
      date: "20 नवम्बर 2025",
      location: "भोपाल, मध्यप्रदेश",
    },
  ];

  const events = selectedType === "past" ? pastEvents : upcomingEvents;

  return (
    <section className="max-w-5xl mx-auto text-center mt-20 py-16 px-4">
      <h1 className="text-3xl font-bold text-green-800 mb-2">
        वृक्षारोपण कार्यक्रम 🌳
      </h1>

      {/* 🔸 Radio Buttons */}
      <div className="flex justify-center gap-6 mb-8">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="vraksharopan"
            value="past"
            checked={selectedType === "past"}
            onChange={() => setSelectedType("past")}
            className="accent-green-700"
          />
          <span className="text-gray-700 font-medium">पिछला वृक्षारोपण</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="vraksharopan"
            value="upcoming"
            checked={selectedType === "upcoming"}
            onChange={() => setSelectedType("upcoming")}
            className="accent-green-700"
          />
          <span className="text-gray-700 font-medium">आगामी वृक्षारोपण</span>
        </label>
      </div>

      {/* 🔸 Event Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {events.map((event, i) => (
          <EventCard key={i} {...event} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
