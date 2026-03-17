import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CaseStudies = () => {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const response = await axios.get(`${API}/case-studies`);
      setStudies(response.data);
    } catch (error) {
      console.error('Failed to fetch case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-24 md:py-32 border-b border-border" data-testid="case-studies-header">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-6" data-testid="case-studies-overline">
            Case Studies
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6" data-testid="case-studies-title">
            Real Results
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl" data-testid="case-studies-description">
            Explore how we've helped global enterprises transform their operations and achieve measurable business outcomes.
          </p>
        </div>
      </section>

      {/* Case Studies List */}
      <section className="py-16" data-testid="case-studies-list">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          {loading ? (
            <div className="text-center py-20" data-testid="loading-state">
              <p className="text-muted">Loading case studies...</p>
            </div>
          ) : studies.length === 0 ? (
            <div className="text-center py-20" data-testid="empty-state">
              <p className="text-muted">No case studies available yet. Check back soon.</p>
            </div>
          ) : (
            <div className="border-t border-border">
              {studies.map((study, index) => (
                <Link
                  key={study.id}
                  to={`/case-studies/${study.id}`}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 p-8 md:p-12 border-b border-border hover:bg-secondary/30 transition-colors duration-300 group"
                  data-testid={`case-study-item-${index}`}
                >
                  <div className="md:col-span-3">
                    <p className="text-sm uppercase tracking-[0.2em] text-muted mb-2">Client</p>
                    <p className="font-medium" data-testid={`case-study-client-${index}`}>{study.client}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm uppercase tracking-[0.2em] text-muted mb-2">Industry</p>
                    <p className="font-medium" data-testid={`case-study-industry-${index}`}>{study.industry}</p>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-sm uppercase tracking-[0.2em] text-muted mb-2">Challenge</p>
                    <p className="text-muted leading-relaxed" data-testid={`case-study-challenge-${index}`}>{study.challenge}</p>
                  </div>
                  <div className="md:col-span-1 flex items-center justify-end">
                    <ArrowRight className="text-primary group-hover:translate-x-2 transition-transform" size={20} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;