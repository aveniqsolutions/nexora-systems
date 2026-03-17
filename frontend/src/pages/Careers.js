import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapPin, Briefcase, Clock } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API}/careers`);
      setJobs(response.data);
    } catch (error) {
      console.error('Failed to fetch careers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-24 md:py-32 border-b border-border" data-testid="careers-header">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-6" data-testid="careers-overline">
            Careers at Nexora
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6" data-testid="careers-title">
            Build the Future
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl" data-testid="careers-description">
            Join a team of world-class engineers, strategists, and innovators solving complex challenges for global enterprises.
          </p>
        </div>
      </section>

      {/* Why Nexora */}
      <section className="py-24 md:py-32 border-b border-border" data-testid="why-nexora-section">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-semibold mb-16 text-center" data-testid="why-nexora-title">Why Nexora?</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-l border-t border-border">
            <div className="md:col-span-4 p-12 border-r border-b border-border" data-testid="benefit-learning">
              <h3 className="text-2xl font-medium mb-4">Continuous Learning</h3>
              <p className="text-muted leading-relaxed">
                Access to cutting-edge technologies, training programs, and conferences to advance your skills.
              </p>
            </div>
            <div className="md:col-span-4 p-12 border-r border-b border-border" data-testid="benefit-impact">
              <h3 className="text-2xl font-medium mb-4">Real Impact</h3>
              <p className="text-muted leading-relaxed">
                Work on projects that transform global enterprises and shape the future of industries.
              </p>
            </div>
            <div className="md:col-span-4 p-12 border-r border-b border-border" data-testid="benefit-culture">
              <h3 className="text-2xl font-medium mb-4">Collaborative Culture</h3>
              <p className="text-muted leading-relaxed">
                Join a diverse team of experts who value collaboration, innovation, and excellence.
              </p>
            </div>
            <div className="md:col-span-4 p-12 border-r border-b border-border" data-testid="benefit-flexibility">
              <h3 className="text-2xl font-medium mb-4">Flexibility</h3>
              <p className="text-muted leading-relaxed">
                Hybrid work options and flexible schedules that support work-life balance.
              </p>
            </div>
            <div className="md:col-span-4 p-12 border-r border-b border-border" data-testid="benefit-benefits">
              <h3 className="text-2xl font-medium mb-4">Comprehensive Benefits</h3>
              <p className="text-muted leading-relaxed">
                Competitive compensation, health benefits, equity options, and generous PTO.
              </p>
            </div>
            <div className="md:col-span-4 p-12 border-r border-b border-border" data-testid="benefit-growth">
              <h3 className="text-2xl font-medium mb-4">Career Growth</h3>
              <p className="text-muted leading-relaxed">
                Clear career progression paths and mentorship programs to accelerate your development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 md:py-32 border-b border-border" data-testid="open-positions-section">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-semibold mb-16" data-testid="positions-title">Open Positions</h2>
          {loading ? (
            <div className="text-center py-20" data-testid="loading-state">
              <p className="text-muted">Loading positions...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20 border border-border p-12" data-testid="empty-state">
              <p className="text-muted mb-4">No open positions at the moment.</p>
              <p className="text-sm text-muted">Check back soon or send your resume to careers@nexora.systems</p>
            </div>
          ) : (
            <div className="border-t border-border">
              {jobs.map((job, index) => (
                <div
                  key={job.id}
                  className="border-b border-border p-8 md:p-12 hover:bg-secondary/30 transition-colors duration-300"
                  data-testid={`job-item-${index}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-medium mb-2" data-testid={`job-title-${index}`}>{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted">
                        <span className="flex items-center" data-testid={`job-department-${index}`}>
                          <Briefcase size={16} className="mr-2" />
                          {job.department}
                        </span>
                        <span className="flex items-center" data-testid={`job-location-${index}`}>
                          <MapPin size={16} className="mr-2" />
                          {job.location}
                        </span>
                        <span className="flex items-center" data-testid={`job-type-${index}`}>
                          <Clock size={16} className="mr-2" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <a
                      href="/contact"
                      className="mt-4 md:mt-0 inline-flex h-10 px-6 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-all duration-300 active:scale-95 items-center"
                      data-testid={`job-apply-btn-${index}`}
                    >
                      Apply Now
                    </a>
                  </div>
                  <p className="text-muted leading-relaxed mb-4" data-testid={`job-description-${index}`}>{job.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Careers;