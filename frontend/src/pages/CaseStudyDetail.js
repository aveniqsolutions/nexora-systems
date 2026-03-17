import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CaseStudyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCaseStudy();
  }, [id]);

  const fetchCaseStudy = async () => {
    try {
      const response = await axios.get(`${API}/case-studies/${id}`);
      setStudy(response.data);
    } catch (error) {
      console.error('Failed to fetch case study:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center" data-testid="loading-state">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (!study) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center" data-testid="not-found-state">
        <div className="text-center">
          <p className="text-muted mb-4">Case study not found</p>
          <button onClick={() => navigate('/case-studies')} className="text-primary hover:underline">
            Back to Case Studies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-24 md:py-32 border-b border-border" data-testid="case-study-header">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <button
            onClick={() => navigate('/case-studies')}
            className="flex items-center text-sm text-muted hover:text-foreground mb-8 transition-colors"
            data-testid="back-button"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Case Studies
          </button>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-6" data-testid="case-study-industry">
            {study.industry}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6" data-testid="case-study-title">
            {study.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground" data-testid="case-study-client">
            Client: {study.client}
          </p>
        </div>
      </section>

      {/* Image */}
      {study.image_url && (
        <section className="border-b border-border" data-testid="case-study-image">
          <img src={study.image_url} alt={study.title} className="w-full h-[400px] md:h-[600px] object-cover" loading="lazy" />
        </section>
      )}

      {/* Content */}
      <section className="py-16" data-testid="case-study-content">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8">
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl md:text-3xl font-medium mb-4" data-testid="challenge-title">The Challenge</h2>
                  <p className="text-muted leading-relaxed" data-testid="challenge-content">{study.challenge}</p>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-medium mb-4" data-testid="solution-title">Our Solution</h2>
                  <p className="text-muted leading-relaxed" data-testid="solution-content">{study.solution}</p>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-medium mb-4" data-testid="impact-title">Impact</h2>
                  <p className="text-muted leading-relaxed" data-testid="impact-content">{study.impact}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="border border-border p-8">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6">Key Metrics</h3>
                <div className="space-y-6">
                  {study.metrics && study.metrics.map((metric, index) => (
                    <div key={index} data-testid={`metric-${index}`}>
                      <div className="text-3xl font-bold text-primary mb-1" data-testid={`metric-value-${index}`}>{metric.value}</div>
                      <p className="text-sm text-muted" data-testid={`metric-label-${index}`}>{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 border-t border-border" data-testid="case-study-cta">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">Ready for Similar Results?</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Let's discuss how we can transform your business.
          </p>
          <a
            href="/demo"
            className="inline-flex h-12 px-8 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-all duration-300 active:scale-95 items-center"
            data-testid="cta-demo-btn"
          >
            Request Demo
          </a>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyDetail;