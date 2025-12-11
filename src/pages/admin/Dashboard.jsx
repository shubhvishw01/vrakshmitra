import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">🌿 Admin Panel</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/admin/upcoming"
          className="p-6 bg-green-200 text-green-900 shadow rounded-xl font-semibold text-xl hover:bg-green-300"
        >
          Upcoming Events
        </Link>

        <Link
          to="/admin/previous"
          className="p-6 bg-blue-200 text-blue-900 shadow rounded-xl font-semibold text-xl hover:bg-blue-300"
        >
          Previous Events
        </Link>
      </div>
    </div>
  );
}
