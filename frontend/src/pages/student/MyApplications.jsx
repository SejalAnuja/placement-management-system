import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await API.get("/applications/me");
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };

    fetchApps();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        My Applications
      </h1>

      {/* Empty State */}
      {applications.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
          You haven’t applied to any jobs yet.
        </div>
      ) : (

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">

          {/* Scroll wrapper for mobile */}
          <div className="w-full overflow-x-auto">

            <table className="min-w-[600px] w-full text-left text-sm">

              <thead>
                <tr className="border-b text-gray-600">

                  <th className="py-3 px-3">Job Title</th>
                  <th className="py-3 px-3">Company</th>
                  <th className="py-3 px-3">Applied On</th>
                  <th className="py-3 px-3">Status</th>

                </tr>
              </thead>

              <tbody>

                {applications.map((app) => (

                  <tr
                    key={app._id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="py-3 px-3 font-medium">
                      {app.jobId?.title}
                    </td>

                    <td className="py-3 px-3">
                      {app.jobId?.company}
                    </td>

                    <td className="py-3 px-3">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>

                    <td className="py-3 px-3">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          app.status === "Applied"
                            ? "bg-yellow-100 text-yellow-800"
                            : app.status === "Shortlisted"
                            ? "bg-green-100 text-green-800"
                            : app.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {app.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}