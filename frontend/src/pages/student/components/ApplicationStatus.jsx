export default function ApplicationStatus({ applications }) {

  const statusCounts = {
    Pending: 0,
    Shortlisted: 0,
    Rejected: 0,
    Applied: 0
  };

  applications.forEach((a) => {
    statusCounts[a.status] = (statusCounts[a.status] || 0) + 1;
  });

  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl shadow mb-8">

      <h2 className="text-xl font-semibold mb-6">
        Application Status
      </h2>

      {/* Responsive grid instead of flex */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

        {Object.entries(statusCounts).map(([status, count]) => (

          <div
            key={status}
            className="bg-gray-50 rounded-lg p-4 text-center hover:shadow transition"
          >

            <p className="text-2xl font-bold text-gray-800">
              {count}
            </p>

            <p className="text-sm text-gray-600">
              {status}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}