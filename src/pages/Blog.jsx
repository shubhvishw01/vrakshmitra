const Blog = () => {
  const posts = [
    {
      title: "Why Trees Are the Future",
      date: "Oct 2025",
      desc: "Trees purify air, prevent floods, and sustain life. Here's why we need more trees than ever.",
    },
    {
      title: "How to Care for Saplings",
      date: "Sep 2025",
      desc: "Learn easy tips to help your planted saplings grow stronger and healthier.",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto mt-20 mb-20">
      <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
        Green Blog 🪴
      </h1>
      <div className="space-y-6">
        {posts.map((p, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-green-700">{p.title}</h2>
            <p className="text-gray-500 text-sm mb-2">📅 {p.date}</p>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
