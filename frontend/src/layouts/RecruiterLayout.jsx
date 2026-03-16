import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LogOut, User, Settings, Menu, X } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

export default function RecruiterLayout() {

  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { path: "/recruiter/dashboard", label: "Dashboard" },
    { path: "/recruiter/post-job", label: "Post Job" },
    { path: "/recruiter/my-jobs", label: "My Jobs" },
  ];

  const handleExport = async () => {
    try {

      const res = await API.get("/applications/recruiter/export", {
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "applications_export.csv";
      link.click();

      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export data ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-md sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center gap-3">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
            </svg>

            <h1 className="font-bold text-lg sm:text-xl">
              Placement & Internship
            </h1>

          </div>


          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">

            {navLinks.map((link) => (

              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition ${
                  location.pathname === link.path
                    ? "border-b-2 border-white"
                    : "text-gray-100 hover:text-white"
                }`}
              >
                {link.label}
              </Link>

            ))}

            <button
              onClick={handleExport}
              className="text-sm font-medium hover:text-gray-200"
            >
              Export Data
            </button>

          </div>


          {/* Right Side */}
          <div className="flex items-center gap-4">

            <button className="hover:text-gray-200 hidden sm:block">
              <Settings size={18} />
            </button>

            {/* Profile */}
            <div className="relative">

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="bg-white/20 rounded-full p-2 hover:bg-white/30"
              >
                <User size={18} />
              </button>

              {profileOpen && (

                <div className="absolute right-0 mt-2 w-44 bg-white text-gray-700 rounded-lg shadow-lg">

                  <div className="px-4 py-2 border-b text-sm">
                    {user?.email || "Recruiter"}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>

                </div>

              )}

            </div>


            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>

        </div>


        {/* Mobile Navigation */}
        {mobileMenuOpen && (

          <div className="md:hidden bg-blue-900 px-4 pb-4">

            {navLinks.map((link) => (

              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 border-b border-blue-800"
              >
                {link.label}
              </Link>

            ))}

            <button
              onClick={handleExport}
              className="block py-2 mt-2 text-left"
            >
              Export Data
            </button>

          </div>

        )}

      </nav>


      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        <Outlet />

      </main>

    </div>
  );
}