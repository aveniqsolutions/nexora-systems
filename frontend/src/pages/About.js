import React, { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-24 md:py-32 border-b border-border" data-testid="about-header">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-6" data-testid="about-overline">
            About Nexora
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6" data-testid="about-title">
            Engineering Tomorrow
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl" data-testid="about-description">
            We are a global AI and digital transformation consultancy, partnering with enterprises to architect intelligent systems that drive measurable impact.
          </p>
        </div>
      </section>

      {/* Mission Split */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-border" data-testid="mission-section">
        <div className="p-12 md:p-16 border-r border-border flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6" data-testid="mission-title">Our Mission</h2>
          <p className="text-muted leading-relaxed text-lg" data-testid="mission-description">
            To empower enterprises with AI-driven solutions that transform operations, unlock intelligence, and create sustainable competitive advantages in an increasingly digital world.
          </p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1770048532712-4fde5ef7eb90?q=85&w=1080&auto=format&fit=crop"
            alt="Team collaboration"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 border-b border-border" data-testid="values-section">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-semibold mb-16 text-center" data-testid="values-title">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-l border-t border-border">
            <div className="md:col-span-4 p-12 border-r border-b border-border" data-testid="value-precision">
              <h3 className="text-2xl font-medium mb-4">Precision</h3>
              <p className="text-muted leading-relaxed">
                We engineer solutions with meticulous attention to detail, ensuring every component delivers optimal performance and reliability.
              </p>
            </div>
            <div className="md:col-span-4 p-12 border-r border-b border-border" data-testid="value-innovation">
              <h3 className="text-2xl font-medium mb-4">Innovation</h3>
              <p className="text-muted leading-relaxed">
                We push boundaries, exploring emerging technologies and methodologies to deliver solutions that set new industry standards.
              </p>
            </div>
            <div className="md:col-span-4 p-12 border-r border-b border-border" data-testid="value-partnership">
              <h3 className="text-2xl font-medium mb-4">Partnership</h3>
              <p className="text-muted leading-relaxed">
                We work alongside our clients as trusted advisors, committed to their long-term success and growth.
              </p>
            </div>
            <div className="md:col-span-4 p-12 border-r border-b border-border" data-testid="value-transparency">
              <h3 className="text-2xl font-medium mb-4">Transparency</h3>
              <p className="text-muted leading-relaxed">
                We maintain open communication, providing clear insights into our processes, progress, and outcomes.
              </p>
            </div>
            <div className="md:col-span-4 p-12 border-r border-b border-border" data-testid="value-excellence">
              <h3 className="text-2xl font-medium mb-4">Excellence</h3>
              <p className="text-muted leading-relaxed">
                We hold ourselves to the highest standards, continuously learning and improving to deliver exceptional results.
              </p>
            </div>
            <div className="md:col-span-4 p-12 border-r border-b border-border" data-testid="value-impact">
              <h3 className="text-2xl font-medium mb-4">Impact</h3>
              <p className="text-muted leading-relaxed">
                We focus on measurable business outcomes, ensuring every solution delivers tangible value and ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 md:py-32 border-b border-border" data-testid="stats-section">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="text-center" data-testid="stat-founded">
              <div className="text-5xl font-bold text-primary mb-2">2015</div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Founded</p>
            </div>
            <div className="text-center" data-testid="stat-team">
              <div className="text-5xl font-bold text-primary mb-2">500+</div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Team Members</p>
            </div>
            <div className="text-center" data-testid="stat-countries">
              <div className="text-5xl font-bold text-primary mb-2">40+</div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Countries</p>
            </div>
            <div className="text-center" data-testid="stat-projects">
              <div className="text-5xl font-bold text-primary mb-2">1000+</div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Projects Delivered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Image */}
      <section className="border-b border-border" data-testid="team-image">
        <img
          src="https://images.unsplash.com/photo-1747467327020-fb3a0225a70f?q=85&w=1920&auto=format&fit=crop"
          alt="Nexora team"
          className="w-full h-[500px] object-cover"
          loading="lazy"
        />
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32" data-testid="about-cta">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">Join Our Journey</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            We're always looking for talented individuals to join our team.
          </p>
          <a
            href="/careers"
            className="inline-flex h-12 px-8 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-all duration-300 active:scale-95 items-center"
            data-testid="cta-careers-btn"
          >
            View Careers
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;