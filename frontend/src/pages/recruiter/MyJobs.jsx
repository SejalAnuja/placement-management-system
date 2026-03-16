import { useEffect, useState } from "react";
import API from "../../api/axios";
import Applicants from "./Applicants";
import EditJob from "./EditJob";

export default function MyJobs() {

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editJob, setEditJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch recruiter jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {

        const res = await API.get("/jobs/recruiter/me");
        setJobs(res.data);

      } catch (err) {

        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs");

      } finally {

        setLoading(false);

      }
    };

    fetchJobs();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-6 text-gray-500">
        Loading jobs...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-600 mt-6">
        {error}
      </p>
    );

  // View applicants
  if (selectedJob)
    return (
      <Applicants
        jobId={selectedJob}
        onBack={() => setSelectedJob(null)}
      />
    );

  // Edit job
  if (editJob)
    return (
      <EditJob
        job={editJob}
        onBack={() => setEditJob(null)}
      />
    );

  const handleDelete = async (jobId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/jobs/${jobId}`);

      setJobs((prev) =>
        prev.filter((job) => job._id !== jobId)
      );

      alert("Job deleted successfully ✅");

    } catch (err) {

      console.error("Delete job error:", err);
      alert("Failed to delete job ❌");

    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      <h2 className="text-2xl sm:text-3xl font-bold mb-6">
        My Posted Jobs
      </h2>

      {jobs.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-6 text-gray-500 text-center">
          You haven’t posted any jobs yet.
        </div>

      ) : (

        <div className="space-y-4">

          {jobs.map((job) => (

            <div
              key={job._id}
              className="bg-white rounded-xl shadow p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-md transition"
            >

              {/* Job Info */}
              <div>

                <h3 className="font-semibold text-lg">
                  {job.title}
                </h3>

                <p className="text-gray-600">
                  {job.company}
                </p>

                <p className="text-sm text-gray-500">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      job.status === "Open"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {job.status}
                  </span>
                </p>

              </div>


              {/* Buttons */}
              <div className="flex flex-wrap gap-2">

                <button
                  onClick={() => setSelectedJob(job._id)}
                  className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                >
                  Applicants
                </button>

                <button
                  onClick={() => setEditJob(job)}
                  className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(job._id)}
                  className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}