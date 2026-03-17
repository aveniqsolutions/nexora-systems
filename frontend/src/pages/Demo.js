import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Demo = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    employees: '',
    services_interested: [],
    timeline: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    'AI Strategy & Implementation',
    'Data Engineering & Analytics',
    'Cloud & Infrastructure',
    'Process Automation',
    'Cybersecurity',
    'Digital Transformation'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceToggle = (service) => {
    const services = formData.services_interested.includes(service)
      ? formData.services_interested.filter(s => s !== service)
      : [...formData.services_interested, service];
    setFormData({ ...formData, services_interested: services });
  };

  const handleSubmit = async () => {
    if (formData.services_interested.length === 0) {
      toast.error('Please select at least one service');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/demo-request`, formData);
      setSubmitted(true);
      toast.success('Demo request submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
      console.error('Demo request error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center" data-testid="demo-success">
        <div className="w-full max-w-[600px] mx-auto px-6 text-center">
          <CheckCircle className="mx-auto mb-6 text-primary" size={64} />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Request Received</h1>
          <p className="text-muted leading-relaxed mb-8">
            Thank you for your interest! Our team will review your request and contact you within 24-48 hours to schedule your personalized demo.
          </p>
          <a
            href="/"
            className="inline-flex h-12 px-8 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-all duration-300 active:scale-95 items-center"
            data-testid="demo-home-btn"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-24 md:py-32 border-b border-border" data-testid="demo-header">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-6" data-testid="demo-overline">
            Request a Demo
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6" data-testid="demo-title">
            See Nexora in Action
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl" data-testid="demo-description">
            Schedule a personalized demo to explore how our solutions can transform your business.
          </p>
        </div>
      </section>

      {/* Multi-step Form */}
      <section className="py-16" data-testid="demo-form">
        <div className="w-full max-w-[800px] mx-auto px-6 md:px-12">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                      s <= step ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted'
                    }`}
                    data-testid={`step-indicator-${s}`}
                  >
                    {s}
                  </div>
                  {s < 3 && <div className={`flex-1 h-0.5 mx-4 ${s < step ? 'bg-primary' : 'bg-border'}`}></div>}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-muted">
              <span>Contact Info</span>
              <span>Company Details</span>
              <span>Requirements</span>
            </div>
          </div>

          {/* Step 1: Contact Info */}
          {step === 1 && (
            <div className="space-y-6" data-testid="demo-step-1">
              <h2 className="text-3xl font-semibold mb-6">Your Information</h2>
              <div>
                <label htmlFor="name" className="block text-sm uppercase tracking-[0.2em] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-0 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors"
                  data-testid="demo-name-input"
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
                  data-testid="demo-email-input"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm uppercase tracking-[0.2em] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-12 px-0 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors"
                  data-testid="demo-phone-input"
                />
              </div>
              <button
                onClick={() => formData.name && formData.email && setStep(2)}
                disabled={!formData.name || !formData.email}
                className="w-full h-12 px-8 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                data-testid="demo-next-1-btn"
              >
                Next
                <ArrowRight className="ml-2" size={18} />
              </button>
            </div>
          )}

          {/* Step 2: Company Details */}
          {step === 2 && (
            <div className="space-y-6" data-testid="demo-step-2">
              <h2 className="text-3xl font-semibold mb-6">Company Details</h2>
              <div>
                <label htmlFor="company" className="block text-sm uppercase tracking-[0.2em] mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-0 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors"
                  data-testid="demo-company-input"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm uppercase tracking-[0.2em] mb-2">
                  Your Role *
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-0 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors"
                  data-testid="demo-role-input"
                />
              </div>
              <div>
                <label htmlFor="employees" className="block text-sm uppercase tracking-[0.2em] mb-2">
                  Company Size *
                </label>
                <select
                  id="employees"
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-0 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors"
                  data-testid="demo-employees-select"
                >
                  <option value="">Select company size</option>
                  <option value="1-50">1-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1,000 employees</option>
                  <option value="1001-5000">1,001-5,000 employees</option>
                  <option value="5000+">5,000+ employees</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 h-12 px-8 border border-border font-medium rounded-sm hover:bg-secondary transition-all duration-300 flex items-center justify-center"
                  data-testid="demo-back-2-btn"
                >
                  <ArrowLeft className="mr-2" size={18} />
                  Back
                </button>
                <button
                  onClick={() => formData.company && formData.role && formData.employees && setStep(3)}
                  disabled={!formData.company || !formData.role || !formData.employees}
                  className="flex-1 h-12 px-8 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  data-testid="demo-next-2-btn"
                >
                  Next
                  <ArrowRight className="ml-2" size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Requirements */}
          {step === 3 && (
            <div className="space-y-6" data-testid="demo-step-3">
              <h2 className="text-3xl font-semibold mb-6">Your Requirements</h2>
              <div>
                <label className="block text-sm uppercase tracking-[0.2em] mb-4">
                  Services of Interest *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {services.map((service, index) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleServiceToggle(service)}
                      className={`p-4 border text-left transition-all ${
                        formData.services_interested.includes(service)
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'border-border hover:border-primary/50'
                      }`}
                      data-testid={`demo-service-${index}`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="timeline" className="block text-sm uppercase tracking-[0.2em] mb-2">
                  Timeline *
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-0 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors"
                  data-testid="demo-timeline-select"
                >
                  <option value="">Select timeline</option>
                  <option value="Immediate">Immediate (within 1 month)</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                  <option value="Exploring">Just exploring</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm uppercase tracking-[0.2em] mb-2">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-0 py-2 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors resize-none"
                  data-testid="demo-message-input"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 h-12 px-8 border border-border font-medium rounded-sm hover:bg-secondary transition-all duration-300 flex items-center justify-center"
                  data-testid="demo-back-3-btn"
                >
                  <ArrowLeft className="mr-2" size={18} />
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || formData.services_interested.length === 0 || !formData.timeline}
                  className="flex-1 h-12 px-8 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  data-testid="demo-submit-btn"
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Demo;