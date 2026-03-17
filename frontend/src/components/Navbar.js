import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/case-studies', label: 'Case Studies' },
    { path: '/insights', label: 'Insights' },
    { path: '/about', label: 'About' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-border/20 bg-background/80 backdrop-blur-md" data-testid="navbar">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold tracking-tight" data-testid="logo-link">
              NEXORA
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path) ? 'text-primary' : 'text-muted hover:text-foreground'
                  }`}
                  data-testid={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-sm hover:bg-secondary transition-colors duration-200"
                data-testid="theme-toggle"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {user ? (
                <Link
                  to="/admin"
                  className="hidden md:block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                  data-testid="admin-link"
                >
                  Admin
                </Link>
              ) : null}


              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
                data-testid="mobile-menu-toggle"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-16" data-testid="mobile-menu">
          <div className="flex flex-col p-6 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-medium ${
                  isActive(link.path) ? 'text-primary' : 'text-muted hover:text-foreground'
                }`}
                data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/demo"
              onClick={() => setMobileMenuOpen(false)}
              className="h-12 px-6 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-all duration-300 flex items-center justify-center leading-none"
              data-testid="mobile-demo-cta"
            >
              Request Demo
            </Link>
            {user && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-foreground hover:text-primary"
                data-testid="mobile-admin-link"
              >
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
