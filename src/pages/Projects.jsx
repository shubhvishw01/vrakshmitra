import React from "react";
import { useLang } from "../components/LanguageContext.jsx";

const Projects = () => {
  const { t } = useLang();
  const projects = [
    {
      title: t.projects.title1,
      desc: t.projects.desc1,
      img: "https://nonprod-media.webdunia.com/public_html/_media/hi/img/hp/home-page/2017-06/14/full/1497418216-4858.jpg",
    },
    {
      title: t.projects.title2,
      desc: t.projects.desc2,
      img: "https://www.jagranimages.com/images/newimg/25062022/25_06_2022-ytg_22835264.webp",
    },
    {
      title: t.projects.title3,
      desc: t.projects.desc3,
      img: "https://png.pngtree.com/thumb_back/fh260/background/20250227/pngtree-world-water-day-illustration-conservation-and-environmental-awareness-design-image_17007827.jpg",
    },
  ];

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
            {t.projects.heading} 🌲
          </h2>
          <div className="grid md:grid-cols-3 gap-8 ">
            {projects.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 transform hover:-translate-y-5 transition"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover mx-auto mb-4 rounded-xl"
                />
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
