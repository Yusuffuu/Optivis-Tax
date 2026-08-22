// src/App.jsx - Fixed with unique import names
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/ui/ScrollToTop';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Public Pages (from src/pages/public/)
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ServicesPage from './pages/public/ServicesPage';
import BlogPage from './pages/public/BlogPage';
import BlogPostPage from './pages/public/BlogPostPage';
import ContactPage from './pages/public/ContactPage';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import TermsOfService from './pages/public/TermsOfService';
import Disclaimer from './pages/public/Disclaimer';

// Portal Pages (from src/pages/portal/)
import LoginPage from './pages/portal/LoginPage';
import RegisterPage from './pages/portal/RegisterPage';
import DashboardPage from './pages/portal/DashboardPage';
import PortalServicesPage from './pages/portal/ServicesPage';
import RequestsPage from './pages/portal/RequestsPage';
import RequestDetailPage from './pages/portal/RequestDetailPage';
import ReceiptsPage from './pages/portal/ReceiptsPage';
import ChatPage from './pages/portal/ChatPage';
import PortalSettingsPage from './pages/portal/SettingsPage'; // Renamed

// Admin Pages (from src/pages/admin/)
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ClientsPage from './pages/admin/ClientsPage';
import AdminServicesPage from './pages/admin/ServicesPage';
import AdminBlogPage from './pages/admin/BlogPage';
import NewsletterPage from './pages/admin/NewsletterPage';
import TestimonialsPage from './pages/admin/TestimonialsPage';
import AdminSettingsPage from './pages/admin/SettingsPage'; // Renamed

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router basename="/">
          <ScrollToTop />
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout><HomePage /></Layout>} />
              <Route path="/about" element={<Layout><AboutPage /></Layout>} />
              <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
              <Route path="/insights" element={<Layout><BlogPage /></Layout>} />
              <Route path="/insights/:slug" element={<Layout><BlogPostPage /></Layout>} />
              <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
              <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
              <Route path="/terms-of-service" element={<Layout><TermsOfService /></Layout>} />
              <Route path="/disclaimer" element={<Layout><Disclaimer /></Layout>} />

              {/* Portal Routes */}
              <Route path="/portal/login" element={<LoginPage />} />
              <Route path="/portal/register" element={<RegisterPage />} />
              <Route path="/portal/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/portal/services" element={
                <ProtectedRoute>
                  <PortalServicesPage />
                </ProtectedRoute>
              } />
              <Route path="/portal/requests" element={
                <ProtectedRoute>
                  <RequestsPage />
                </ProtectedRoute>
              } />
              <Route path="/portal/requests/:id" element={
                <ProtectedRoute>
                  <RequestDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/portal/receipts" element={
                <ProtectedRoute>
                  <ReceiptsPage />
                </ProtectedRoute>
              } />
              <Route path="/portal/chat" element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              } />
              <Route path="/portal/settings" element={
                <ProtectedRoute>
                  <PortalSettingsPage />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/clients" element={
                <ProtectedRoute adminOnly>
                  <ClientsPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/services" element={
                <ProtectedRoute adminOnly>
                  <AdminServicesPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/blog" element={
                <ProtectedRoute adminOnly>
                  <AdminBlogPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/newsletter" element={
                <ProtectedRoute adminOnly>
                  <NewsletterPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/testimonials" element={
                <ProtectedRoute adminOnly>
                  <TestimonialsPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute adminOnly>
                  <AdminSettingsPage />
                </ProtectedRoute>
              } />
            </Routes>
          </AnimatePresence>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;