import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function Applicants({ jobId, onBack }) {

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {

    const fetchApplicants = async () => {
      try {

        const res = await API.get(`/applications/job/${jobId}`);
        setApplicants(res.data);

      } catch (err) {

        console.error("Error fetching applicants:", err);

      } finally {

        setLoading(false);

      }
    };

    fetchApplicants();

  }, [jobId]);


  const handleStatusChange = async (appId, newStatus) => {

    try {

      await API.put(`/applications/${appId}/status`, {
        status: newStatus
      });

      setMessage(`Status updated to ${newStatus} ✅`);

      setApplicants((prev) =>
        prev.map((a) =>
          a._id === appId ? { ...a, status: newStatus } : a
        )
      );

    } catch (err) {

      console.error("Update error:", err);
      setMessage("Failed to update status ❌");

    }
  };


  if (loading)
    return (
      <p className="text-center mt-6 text-gray-500">
        Loading applicants...
      </p>
    );


  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Jobs
      </button>


      <div className="bg-white shadow rounded-xl p-5 sm:p-6">

        <h2 className="text-2xl font-bold mb-4">
          Applicants
        </h2>


        {message && (
          <p className="text-green-600 mb-4">
            {message}
          </p>
        )}


        {applicants.length === 0 ? (

          <p className="text-gray-500">
            No applicants yet.
          </p>

        ) : (

          <div className="w-full overflow-x-auto">

            <table className="min-w-[700px] w-full text-left text-sm">

              <thead>
                <tr className="bg-gray-100 border-b">

                  <th className="py-3 px-3">Name</th>
                  <th className="py-3 px-3">Email</th>
                  <th className="py-3 px-3">Resume</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Action</th>

                </tr>
              </thead>


              <tbody>

                {applicants.map((a) => (

                  <tr
                    key={a._id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="py-3 px-3">
                      {a.studentId?.name || "N/A"}
                    </td>

                    <td className="py-3 px-3">
                      {a.studentId?.email || "N/A"}
                    </td>


                    {/* Resume */}
                    <td className="py-3 px-3">

                      {a.studentId?.resumeUrl ? (

                        <a
                          href={a.studentId.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Resume
                        </a>

                      ) : (

                        "No Resume"

                      )}

                    </td>


                    {/* Status Badge */}
                    <td className="py-3 px-3">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          a.status === "Applied"
                            ? "bg-yellow-100 text-yellow-800"
                            : a.status === "Shortlisted"
                            ? "bg-blue-100 text-blue-700"
                            : a.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : a.status === "Selected"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {a.status}
                      </span>

                    </td>


                    {/* Status Action */}
                    <td className="py-3 px-3">

                      <select
                        value={a.status}
                        onChange={(e) =>
                          handleStatusChange(a._id, e.target.value)
                        }
                        className="border rounded px-2 py-1 text-sm"
                      >

                        <option value="Applied">Applied</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Selected">Selected</option>

                      </select>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}