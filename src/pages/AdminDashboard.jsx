const AdminDashboard = () => {
  return (
    <section className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Admin Dashboard
      </h1>
      <p className="text-center text-gray-700 mb-4">
        This area is reserved for managing volunteers, projects, and donations.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-700">Volunteers</h2>
          <p>View and manage all registered volunteers.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-700">Projects</h2>
          <p>Track ongoing and completed plantation drives.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-700">Donations</h2>
          <p>Check donation records and send acknowledgements.</p>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
