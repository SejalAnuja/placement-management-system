import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogOut, User, Menu, X } from "lucide-react";

export default function StudentLayout() {

  const location = useLocation();
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { path: "/student/dashboard", label: "Dashboard" },
    { path: "/student/jobs", label: "Jobs" },
    { path: "/student/applications", label: "Applications" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-lg sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

          {/* Logo + Title */}
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
          <div className="hidden md:flex gap-8">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`pb-1 transition ${
                  location.pathname === link.path
                    ? "border-b-2 border-white font-semibold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

          </div>


          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* Profile Button */}
            <div className="relative">

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="bg-white/20 rounded-full p-2 hover:bg-white/30"
              >
                <User className="h-5 w-5 text-white" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg text-black">

                  <div className="px-4 py-2 text-sm border-b">
                    {user?.email || "Student"}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 w-full text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4" />
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
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>

        </div>


        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-blue-800 px-4 pb-4">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-white border-b border-blue-700"
              >
                {link.label}
              </Link>
            ))}

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