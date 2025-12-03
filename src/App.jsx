// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// login register forgot password
import AuthLayout from './components/Auth/AuthLayout.jsx';

// Public Pages (accessible to everyone)
import HomePage from './Features/Public/Pages/HomePage.jsx';
import HotelDetailPage from './Features/Public/Pages/HotelDetailPage';
import PublicLayout from './Features/Public/layouts/PublicLayout';
import HotelsPage from './Features/Public/Pages/HotelsPage.jsx';
import AboutPage from './Features/Public/Pages/AboutPage.jsx';
import ContactPage from './Features/Public/Pages/ContactPage.jsx';
import MyBookingsPage from './Features/Public/Pages/MyBookingsPage.jsx';


// Manager Pages
import ManagerDashboard from './Features/Manager/pages/ManagerDashboard.jsx';
import ManagerLayout from './Features/Manager/components/ManagerLayout.jsx';
import ManageRoomsPage from './Features/Manager/pages/ManageRoomsPage.jsx';
import BookingsPage from './Features/Manager/pages/BookingsPage.jsx';
import RevenuePage from './Features/Manager/pages/RevenuePage.jsx';
import RevenueSettingsPage from './Features/Manager/pages/RevenueSettingsPage.jsx';
import SettingsPage from './Features/Manager/pages/SettingsPage.jsx';


// Role-Specific Pages (Manager and Admin)

import AdminDashboard from './Features/Admin/pages/Dashboard.jsx';
import NotFoundPage from './components/common/NotFound'; // Simple 404 page

function App() {
  console.log('App.jsx: Rendering');
  return (
    <Router>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          {/* ======================= 1. PUBLIC ROUTES (Accessible to all) ======================= */}
          <Route element={<PublicLayout />} >
            <Route path="/" element={<HomePage />} />
            <Route path='/hotels' element={<HotelsPage />} />
            <Route path='/hotels/:hotelId' element={<HotelDetailPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />

            {/* Protected User Routes */}
            <Route path='/bookings' element={
              <ProtectedRoute allowedRoles={['guest', 'admin', 'manager']}>
                <MyBookingsPage />
              </ProtectedRoute>
            } />
          </Route>

          {/* ======================= AUTH ROUTES ======================= */}
          <Route path="/login" element={<AuthLayout />} />
          <Route path="/register" element={<AuthLayout />} />
          <Route path="/forgot-password" element={<AuthLayout />} />

          {/* ======================= 2. MANAGER ROUTES (Requires 'manager' role) ======================= */}
          <Route element={
            <ProtectedRoute allowedRoles={['manager', 'admin']}>
              <ManagerLayout />
            </ProtectedRoute>
          }>
            <Route path="manager" element={<ManagerDashboard />} />
            <Route path="manager/dashboard" element={<ManagerDashboard />} />
            <Route path="manager/rooms" element={<ManageRoomsPage />} />
            <Route path="manager/bookings" element={<BookingsPage />} />
            <Route path="manager/revenue" element={<RevenuePage />} />
            <Route path="manager/revenue-settings" element={<RevenueSettingsPage />} />
            <Route path="manager/settings" element={<SettingsPage />} />
          </Route>

          {/* ======================= 3. ADMIN ROUTES (Requires 'admin' role) ======================= */}
          <Route path='/admin/*' element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* ======================= 4. FALLBACK ROUTE ======================= */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;