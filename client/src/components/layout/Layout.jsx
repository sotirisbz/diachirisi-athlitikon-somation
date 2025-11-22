import { Outlet } from "react-router-dom";
import Navigation from "./Navigation/Navigation";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="mt-auto py-6 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Διαχείριση Αθλητικών Σωματείων. MERN app.
          </p>
        </div>
      </footer>
    </div>
  );
}
