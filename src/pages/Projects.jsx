const Projects = () => {
  const projects = [
    {
      title: "हर घर पेड़",
      desc: "हर परिवार एक पौधा लगाए — यही हमारा पहला कदम है हरियाली की ओर।",
      img: "https://nonprod-media.webdunia.com/public_html/_media/hi/img/hp/home-page/2017-06/14/full/1497418216-4858.jpg",
    },
    {
      title: "ग्रीन स्कूल अभियान",
      desc: "बच्चों को पेड़ लगाने और प्रकृति से प्रेम करना सिखाना।",
      img: "https://www.jagranimages.com/images/newimg/25062022/25_06_2022-ytg_22835264.webp",
    },
    {
      title: "जल संरक्षण मिशन",
      desc: "वर्षा जल संचयन और जल संरक्षण पर कार्य।",
      img: "https://www.adda247.com/jobs/wp-content/uploads/sites/4/2022/12/14101552/List-of-Water-Conservation-Campaigns-and-Schemes.png",
    },
  ];
  // const drives = [
  //   {
  //     title: "Green Narsinghpur Drive",
  //     date: "August 2025",
  //     trees: 1500,
  //     location: "Narsinghpur",
  //   },
  //   {
  //     title: "School Campus Plantation",
  //     date: "July 2025",
  //     trees: 600,
  //     location: "Khairua",
  //   },
  //   {
  //     title: "Riverside Forest Revival",
  //     date: "June 2025",
  //     trees: 1200,
  //     location: "Narmada Ghat",
  //   },
  // ];

  return (
    <>
      {/* <section className="max-w-5xl mx-auto mt-24 min-h-screen">
        <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
          Our Plantation Projects
        </h1>
        <div className="grid md:grid-cols-3 gap-6">
          {drives.map((d, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-green-700">
                {d.title}
              </h2>
              <p className="text-gray-600">📅 {d.date}</p>
              <p className="text-gray-600">📍 {d.location}</p>
              <p className="font-semibold mt-2 text-green-800">
                🌳 {d.trees} Trees Planted
              </p>
            </div>
          ))}
        </div>
      </section> */}
      {/* 🌲 Projects Section */}
      <section className="py-16 mt-10">
        <div className="relative max-w-6xl mx-auto px-6 text-center transition-all duration-700 hover:scale-105">
          <h2 className="text-4xl font-bold mb-10 text-green-800 text-center">
            हमारे प्रमुख प्रोजेक्ट्स 🌲
          </h2>
          <div className="grid md:grid-cols-3 gap-8 ">
            {projects.map((p, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 transform hover:-translate-y-5 transition"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-48 object-cover mx-auto mb-4 rounded-xl"
                />
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {p.title}
                </h3>
                <p className="text-gray-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
