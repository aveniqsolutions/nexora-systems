import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Mail, MapPin, Phone } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Message sent successfully! We\'ll be in touch soon.');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-24 md:py-32 border-b border-border" data-testid="contact-header">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-6" data-testid="contact-overline">
            Get in Touch
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6" data-testid="contact-title">
            Let's Talk
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl" data-testid="contact-description">
            Have a project in mind? Our team is ready to help you transform your business with AI and digital solutions.
          </p>
        </div>
      </section>

      {/* Split Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-border" data-testid="contact-content">
        {/* Contact Info */}
        <div className="p-12 md:p-16 border-r border-border flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-8" data-testid="contact-info-title">Contact Information</h2>
          <div className="space-y-8">
            <div className="flex items-start" data-testid="contact-email">
              <Mail className="text-primary mt-1 mr-4" size={24} />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted mb-1">Email</p>
                <a href="mailto:hello@nexora.systems" className="text-lg hover:text-primary transition-colors">
                  hello@nexora.systems
                </a>
              </div>
            </div>
            <div className="flex items-start" data-testid="contact-phone">
              <Phone className="text-primary mt-1 mr-4" size={24} />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted mb-1">Phone</p>
                <a href="tel:+15551234567" className="text-lg hover:text-primary transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
            <div className="flex items-start" data-testid="contact-address">
              <MapPin className="text-primary mt-1 mr-4" size={24} />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted mb-1">Headquarters</p>
                <p className="text-lg">
                  123 Innovation Drive<br />
                  San Francisco, CA 94107<br />
                  United States
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-12 md:p-16 bg-secondary/20">
          <h2 className="text-3xl font-semibold mb-8" data-testid="contact-form-title">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
            <div>
              <label htmlFor="name" className="block text-sm uppercase tracking-[0.2em] mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full h-12 px-0 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors"
                data-testid="contact-name-input"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm uppercase tracking-[0.2em] mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-12 px-0 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors"
                data-testid="contact-email-input"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm uppercase tracking-[0.2em] mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full h-12 px-0 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors"
                data-testid="contact-company-input"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm uppercase tracking-[0.2em] mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-0 py-2 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors resize-none"
                data-testid="contact-message-input"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 px-8 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="contact-submit-btn"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;