import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import AppRoutes from "./routes/AppRoutes.jsx";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

// import { Suspense, Activity, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   NavLink,
// } from "react-router-dom";

// // Loading component
// const Loading = () => (
//   <div className="flex justify-center items-center min-h-screen">
//     <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent"></div>
//   </div>
// );

// // Navigation component
// const Navigation = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-lg border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <span className="text-2xl font-bold text-primary-600">
//               ⚡ Αθλητικό Σωμτατείο
//             </span>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             <NavLink
//               to="/"
//               className={({ isActive }) => {
//                 `px-3 py-2 text-sm font-medium ${
//                   isActive
//                     ? "text-primary-600"
//                     : "text-gray-700 hover:text-primary-500"
//                 }`;
//               }}
//             >
//               Πίνακας Ελέγχου
//             </NavLink>
//             <NavLink
//               to="/athletes"
//               className={({ isActive }) => {
//                 `px-3 py-2 text-sm font-medium ${
//                   isActive
//                     ? "text-primary-600"
//                     : "text-gray-700 hover:text-primary-500"
//                 }`;
//               }}
//             >
//               Αθλητές
//             </NavLink>
//             <NavLink
//               to="/staff"
//               className={({ isActive }) => {
//                 `px-3 py-2 text-sm font-medium ${
//                   isActive
//                     ? "text-primary-600"
//                     : "text-gray-700 hover:text-primary-500"
//                 }`;
//               }}
//             >
//               Προσωπικό
//             </NavLink>
//             <NavLink
//               to="/teams"
//               className={({ isActive }) => {
//                 `px-3 py-2 text-sm font-medium ${
//                   isActive
//                     ? "text-primary-600"
//                     : "text-gray-700 hover:text-primary-500"
//                 }`;
//               }}
//             >
//               Ομάδες
//             </NavLink>
//           </div>

//           {/* Mobile Menu Button*/}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-700 hover:text-primary-600 focus:outline-none"
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 {isOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             <NavLink
//               to="/"
//               className={({ isActive }) => {
//                 `block px-3 py-2 rounded-md text-base font-medium ${
//                   isActive
//                     ? "bg-primary-50 text-primary-600"
//                     : "text-gray-700 hover:bg-gray-50"
//                 }`;
//               }}
//               onClick={() => setIsOpen(false)}
//             >
//               Πίνακας Ελέγχου
//             </NavLink>
//             <NavLink
//               to="/athletes"
//               className={({ isActive }) => {
//                 `block px-3 py-2 rounded-md text-base font-medium ${
//                   isActive
//                     ? "bg-primary-50 text-primary-600"
//                     : "text-gray-700 hover:bg-gray-50"
//                 }`;
//               }}
//               onClick={() => setIsOpen(false)}
//             >
//               Αθλητές
//             </NavLink>
//             <NavLink
//               to="/staff"
//               className={({ isActive }) => {
//                 `block px-3 py-2 rounded-md text-base font-medium ${
//                   isActive
//                     ? "bg-primary-50 text-primary-600"
//                     : "text-gray-700 hover:bg-gray-50"
//                 }`;
//               }}
//               onClick={() => setIsOpen(false)}
//             >
//               Προσωπικό
//             </NavLink>
//             <NavLink
//               to="/teams"
//               className={({ isActive }) => {
//                 `block px-3 py-2 rounded-md text-base font-medium ${
//                   isActive
//                     ? "bg-primary-50 text-primary-600"
//                     : "text-gray-700 hover:bg-gray-50"
//                 }`;
//               }}
//               onClick={() => setIsOpen(false)}
//             >
//               Ομάδες
//             </NavLink>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <Navigation />
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"></main>
//       </div>
//     </Router>
//   );
// }

// export default App;
