// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <header className="bg-white shadow-md sticky top-0 z-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
//         <div className="flex items-center">
//           <span className="text-2xl font-bold text-blue-600 font-inter">🏨 LUXE STAY</span>
//           <nav className="hidden md:ml-10 md:flex md:space-x-4">
//             {navLinks[userRole].map(link => (
//               <a 
//                 key={link.name}
//                 href={link.href}
//                 className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
//               >
//                 {link.name}
//               </a>
//             ))}
//           </nav>
//         </div>
//         <div className="flex items-center space-x-4">
//           {/* Role Toggle Button (for demonstration purposes only) */}
//           <button
//             onClick={() => setUserRole(getNextRole(userRole))}
//             className="flex items-center bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-100 transition"
//           >
//             <User className="w-4 h-4 mr-1" />
//             Role: {roleDisplay}
//           </button>
          
//           <button className="text-gray-600 hover:text-red-600 p-2 rounded-full hover:bg-gray-100 transition">
//             <LogOut className="w-5 h-5" />
//           </button>
//           <Link 
//             to="/login" 
//             className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-md text-sm font-medium transition"
//           >
//             Login
//           </Link>
//           <Link 
//             to="/register" 
//             className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Navbar