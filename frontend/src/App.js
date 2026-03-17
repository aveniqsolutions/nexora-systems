import React from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Insights from './pages/Insights';
import InsightDetail from './pages/InsightDetail';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Demo from './pages/Demo';
import Privacy from './pages/Privacy';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageContent from './pages/admin/ManageContent';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Toaster position="top-right" />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <>
                  <Navbar />
                  <Home />
                  <Footer />
                  <CookieConsent />
                </>
              } />
              <Route path="/services" element={
                <>
                  <Navbar />
                  <Services />
                  <Footer />
                  <CookieConsent />
                </>
              } />
              <Route path="/case-studies" element={
                <>
                  <Navbar />
                  <CaseStudies />
                  <Footer />
                  <CookieConsent />
                </>
              } />
              <Route path="/case-studies/:id" element={
                <>
                  <Navbar />
                  <CaseStudyDetail />
                  <Footer />
                  <CookieConsent />
                </>
              } />
              <Route path="/insights" element={
                <>
                  <Navbar />
                  <Insights />
                  <Footer />
                  <CookieConsent />
                </>
              } />
              <Route path="/insights/:slug" element={
                <>
                  <Navbar />
                  <InsightDetail />
                  <Footer />
                  <CookieConsent />
                </>
              } />
              <Route path="/about" element={
                <>
                  <Navbar />
                  <About />
                  <Footer />
                  <CookieConsent />
                </>
              } />
              <Route path="/careers" element={
                <>
                  <Navbar />
                  <Careers />
                  <Footer />
                  <CookieConsent />
                </>
              } />
              <Route path="/contact" element={
                <>
                  <Navbar />
                  <Contact />
                  <Footer />
                  <CookieConsent />
                </>
              } />
              <Route path="/demo" element={
                <>
                  <Navbar />
                  <Demo />
                  <Footer />
                  <CookieConsent />
                </>
              } />
              <Route path="/privacy" element={
                <>
                  <Navbar />
                  <Privacy />
                  <Footer />
                  <CookieConsent />
                </>
              } />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <>
                  <Navbar />
                  <AdminLayout />
                </>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="case-studies" element={<ManageContent type="case-studies" />} />
                <Route path="blog" element={<ManageContent type="blog" />} />
                <Route path="contacts" element={<ManageContent type="contacts" />} />
                <Route path="demos" element={<ManageContent type="demos" />} />
                <Route path="careers" element={<ManageContent type="careers" />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
