import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogOut, UserCog, BarChart3, Menu, X } from "lucide-react";

export default function AdminLayout() {

  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/users", label: "Users" },
    { path: "/admin/jobs", label: "Jobs" },
    { path: "/admin/applications", label: "Applications" },
    { path: "/admin/reports", label: "Reports" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-md sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center gap-2">

            <BarChart3 className="h-7 w-7" />

            <h1 className="text-lg sm:text-xl font-bold">
              PIMS Admin
            </h1>

          </div>


          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">

            {links.map((link) => (

              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition ${
                  location.pathname === link.path
                    ? "border-b-2 border-white"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                {link.label}
              </Link>

            ))}

          </div>


          {/* Right Section */}
          <div className="flex items-center gap-4">

            <UserCog className="h-5 w-5 hidden sm:block" />

            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-1 bg-white text-blue-600 px-3 py-1 rounded-md text-sm font-semibold hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>


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

            {links.map((link) => (

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
              onClick={handleLogout}
              className="block py-2 mt-2 text-left text-red-300"
            >
              Logout
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