import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Πίνακας Ελέγχου", icon: "📊" },
    { path: "/athletes", label: "Αθλητές", icon: "🏃" },
    { path: "/teams", label: "Ομάδες", icon: "👥" },
    { path: "/staff", label: "Προσωπικό", icon: "👔" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">⚽</span>
              <span className="text-xl font-bold text-gray-900">
                Διαχειριστής Σωματείου
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-1 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {/*   className="inline-flex items-center justify-center px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" */}
                <span className="mr-2">{item.icon}</span> {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
