const Projects = () => {
  const drives = [
    {
      title: "Green Narsinghpur Drive",
      date: "August 2025",
      trees: 1500,
      location: "Narsinghpur",
    },
    {
      title: "School Campus Plantation",
      date: "July 2025",
      trees: 600,
      location: "Khairua",
    },
    {
      title: "Riverside Forest Revival",
      date: "June 2025",
      trees: 1200,
      location: "Narmada Ghat",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto mt-24 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
        Our Plantation Projects
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        {drives.map((d, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-green-700">{d.title}</h2>
            <p className="text-gray-600">📅 {d.date}</p>
            <p className="text-gray-600">📍 {d.location}</p>
            <p className="font-semibold mt-2 text-green-800">
              🌳 {d.trees} Trees Planted
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
