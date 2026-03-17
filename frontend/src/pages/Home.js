import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Database, Cloud, TrendingUp } from 'lucide-react';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1642097972624-6ed84e4fe099?q=85&w=1920&auto=format&fit=crop"
            alt="Abstract technology"
            className="w-full h-full object-cover opacity-30"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-6" data-testid="hero-overline">
              AI & Digital Transformation
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6" data-testid="hero-title">
              Engineer the Future of Enterprise
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-12" data-testid="hero-description">
              We architect AI-powered solutions that transform operations, unlock insights, and drive measurable business outcomes for global enterprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/demo"
                className="h-12 px-8 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-all duration-300 active:scale-95 flex items-center justify-center"
                data-testid="hero-demo-btn"
              >
                Request Demo
                <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link
                to="/case-studies"
                className="h-12 px-8 border border-border font-medium rounded-sm hover:bg-secondary transition-all duration-300 flex items-center justify-center"
                data-testid="hero-cases-btn"
              >
                View Case Studies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-24 md:py-32 border-t border-border" data-testid="value-prop-section">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-l border-t border-border">
            <div className="md:col-span-6 p-8 md:p-12 border-r border-b border-border">
              <div className="text-6xl font-bold text-primary mb-4" data-testid="stat-clients">150+</div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Enterprise Clients</p>
            </div>
            <div className="md:col-span-6 p-8 md:p-12 border-r border-b border-border">
              <div className="text-6xl font-bold text-primary mb-4" data-testid="stat-experts">500+</div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">AI & Data Experts</p>
            </div>
            <div className="md:col-span-6 p-8 md:p-12 border-r border-b border-border">
              <div className="text-6xl font-bold text-primary mb-4" data-testid="stat-countries">40+</div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Countries Served</p>
            </div>
            <div className="md:col-span-6 p-8 md:p-12 border-r border-b border-border">
              <div className="text-6xl font-bold text-primary mb-4" data-testid="stat-roi">3.5x</div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Average ROI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlight - Split Layout */}
      <section className="py-24 md:py-32 border-t border-border" data-testid="services-section">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-12 md:p-16 border-r border-b border-border flex flex-col justify-center">
            <div className="mb-6 p-3 bg-primary/10 w-fit rounded-sm">
              <Cpu className="text-primary" size={32} />
            </div>
            <h3 className="text-2xl md:text-3xl font-medium mb-4" data-testid="service-ai-title">AI Strategy & Implementation</h3>
            <p className="text-muted leading-relaxed mb-6">
              End-to-end AI transformation from strategy development to deployment. We build intelligent systems that learn, adapt, and scale with your business.
            </p>
            <Link to="/services" className="text-primary font-medium flex items-center hover:gap-2 transition-all" data-testid="service-ai-link">
              Learn More <ArrowRight className="ml-1" size={18} />
            </Link>
          </div>
          <div className="border-b border-border">
            <img
              src="https://images.unsplash.com/photo-1645477704075-cb3d14b349ee?q=85&w=1080&auto=format&fit=crop"
              alt="AI Technology"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="order-last md:order-none border-b border-border">
            <img
              src="https://images.unsplash.com/photo-1639094071972-a79473d1a7c6?q=85&w=1080&auto=format&fit=crop"
              alt="Data Infrastructure"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-12 md:p-16 border-r border-b border-border flex flex-col justify-center">
            <div className="mb-6 p-3 bg-primary/10 w-fit rounded-sm">
              <Database className="text-primary" size={32} />
            </div>
            <h3 className="text-2xl md:text-3xl font-medium mb-4" data-testid="service-data-title">Data Engineering & Analytics</h3>
            <p className="text-muted leading-relaxed mb-6">
              Build robust data pipelines and analytics platforms that transform raw data into actionable business intelligence.
            </p>
            <Link to="/services" className="text-primary font-medium flex items-center hover:gap-2 transition-all" data-testid="service-data-link">
              Learn More <ArrowRight className="ml-1" size={18} />
            </Link>
          </div>

          <div className="p-12 md:p-16 border-r border-b border-border flex flex-col justify-center">
            <div className="mb-6 p-3 bg-primary/10 w-fit rounded-sm">
              <Cloud className="text-primary" size={32} />
            </div>
            <h3 className="text-2xl md:text-3xl font-medium mb-4" data-testid="service-cloud-title">Cloud & Infrastructure</h3>
            <p className="text-muted leading-relaxed mb-6">
              Modernize your infrastructure with cloud-native architectures designed for scalability, security, and performance.
            </p>
            <Link to="/services" className="text-primary font-medium flex items-center hover:gap-2 transition-all" data-testid="service-cloud-link">
              Learn More <ArrowRight className="ml-1" size={18} />
            </Link>
          </div>
          <div className="border-b border-border">
            <img
              src="https://images.unsplash.com/photo-1747467327020-fb3a0225a70f?q=85&w=1080&auto=format&fit=crop"
              alt="Business Meeting"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 border-t border-border" data-testid="cta-section">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6" data-testid="cta-title">
            Ready to Transform Your Enterprise?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12" data-testid="cta-description">
            Schedule a consultation with our experts to discuss your digital transformation journey.
          </p>
          <Link
            to="/demo"
            className="inline-flex h-12 px-8 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-all duration-300 active:scale-95 items-center"
            data-testid="cta-demo-btn"
          >
            Get Started
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;